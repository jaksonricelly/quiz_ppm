let questions = [];
let current = 0;
let selectedQuestion = null;

// estado com tentativas
let answered = {};
// {
//   index: {
//     selected: i,
//     correct: true/false,
//     attempts: number
//   }
// }

const params = new URLSearchParams(window.location.search);
const file = params.get("file") || "questions_ti.json";

fetch(`./${file}`)
  .then((res) => res.json())
  .then((data) => {
    questions = data.questions;

    // CARREGAR PROGRESSO SALVO
    const saved = localStorage.getItem("quiz_state");
    if (saved) {
      answered = JSON.parse(saved);
    }

    createMenu();
    loadQuestion(0);
    updateProgress();
  });

function createMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  questions.forEach((q, index) => {
    const btn = document.createElement("button");
    btn.innerText = index + 1;
    btn.onclick = () => loadQuestion(index);
    menu.appendChild(btn);
  });
}

function updateMenu() {
  const buttons = document.querySelectorAll("#menu button");

  buttons.forEach((btn, index) => {
    btn.classList.remove("active");

    // RESET BASE
    btn.style.background = "#1e293b";

    // CORES DE RESPOSTA
    if (answered[index]) {
      if (answered[index].correct) {
        btn.style.background = "#22c55e";
      } else if (answered[index].attempts >= 2) {
        btn.style.background = "#ef4444";
      }
    }

    // DESTACAR QUESTÃO ATUAL (FORÇA VISUAL)
    if (index === current) {
      btn.classList.add("active");
      btn.style.outline = "3px solid #facc15";
      btn.style.transform = "scale(1.1)";
    } else {
      btn.style.outline = "none";
      btn.style.transform = "scale(1)";
    }
  });
}

function loadQuestion(index) {
  selectedQuestion = questions[index];
  current = index;

  document.getElementById("q-title").innerText = selectedQuestion.title;
  document.getElementById("q-text").innerText = selectedQuestion.question;
  const container = document.getElementById("q-images");
  container.innerHTML = "";

  if (selectedQuestion.images) {
    selectedQuestion.images.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("q-image");
      container.appendChild(img);
    });
  }
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  selectedQuestion.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.setAttribute("data-letter", ["A)", "B)", "C)", "D)", "E)"][i]);
    btn.innerText = opt.text;
    btn.onclick = () => {
      // se já acertou, trava
      if (answered[current] && answered[current].correct) return;

      // se já usou 2 tentativas, trava
      if (answered[current] && answered[current].attempts >= 2) return;

      if (!answered[current]) {
        answered[current] = {
          selected: i,
          correct: opt.correct,
          attempts: 1,
        };
      } else {
        // atualiza sem resetar tentativas
        answered[current].selected = i;
        answered[current].correct = opt.correct;
        answered[current].attempts += 1;
      }

      localStorage.setItem("quiz_state", JSON.stringify(answered));

      showAnswers();
      updateMenu();
      updateProgress();
      updateRetryButton();

      document.getElementById("nextBtn").classList.remove("hidden");
    };

    optionsDiv.appendChild(btn);
  });

  updateMenu();

  if (answered[current]) {
    showAnswers();
  }

  updateRetryButton();

  document.getElementById("quiz-box").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  document.getElementById("nextBtn").classList.add("hidden");
}

function showAnswers() {
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach((btn) => {
    btn.classList.remove("correct");
    btn.classList.remove("wrong");
  });

  selectedQuestion.options.forEach((opt, i) => {
    // mostra correta se acertou OU acabou tentativas
    if (
      opt.correct &&
      (answered[current].correct || answered[current].attempts >= 2)
    ) {
      buttons[i].classList.add("correct");
    }

    if (!opt.correct && answered[current].selected === i) {
      buttons[i].classList.add("wrong");
    }
  });
}

function updateRetryButton() {
  const retryBtn = document.getElementById("retryBtn");

  if (
    answered[current] &&
    !answered[current].correct &&
    answered[current].attempts < 2
  ) {
    retryBtn.classList.remove("hidden");
  } else {
    retryBtn.classList.add("hidden");
  }
}

// reset tentativa
document.getElementById("retryBtn").onclick = () => {
  loadQuestion(current);
};

function nextQuestion() {
  if (current < questions.length - 1) {
    loadQuestion(current + 1);
  }
}

function prevQuestion() {
  if (current > 0) {
    loadQuestion(current - 1);
  }
}

function closeResult() {
  document.getElementById("resultModal").classList.add("hidden");
}

function showResult() {
  let acertos = 0;
  let html = "";

  questions.forEach((q, index) => {
    const resposta = answered[index];
    const correta = q.options.find((o) => o.correct).text;
    const marcada = resposta
      ? q.options[resposta.selected].text
      : "Não respondida";

    const isCorrect = resposta ? resposta.correct : false;

    if (isCorrect) acertos++;

    html += `
      <div class="result-item ${isCorrect ? "correct" : "wrong"}">
        <strong>Questão ${index + 1}</strong><br>
        Sua resposta: ${marcada}<br>
        Correta: ${correta}
      </div>
    `;
  });

  const total = questions.length;
  const percent = Math.round((acertos / total) * 100);

  document.getElementById("resultContent").innerHTML = `
    <h2>${acertos} / ${total} acertos (${percent}%)</h2>
    ${html}
  `;

  document.getElementById("resultModal").classList.remove("hidden");
  document.getElementById("viewResultBtn").classList.remove("hidden");
}

function updateProgress() {
  const total = questions.length;
  const done = Object.keys(answered).length;

  const percent = Math.round((done / total) * 100);
  document.getElementById("progress").innerText = percent + "%";
  if (done === total) {
    showResult();
  }
}

function downloadResult() {
  let texto = "RESULTADO DO QUIZ\n\n";

  let acertos = 0;

  questions.forEach((q, index) => {
    const resposta = answered[index];
    const correta = q.options.find((o) => o.correct).text;
    const marcada = resposta
      ? q.options[resposta.selected].text
      : "Não respondida";

    const isCorrect = resposta.correct;

    if (isCorrect) acertos++;

    texto += `Questão ${index + 1}\n`;
    texto += `Sua resposta: ${marcada}\n`;
    texto += `Correta: ${correta}\n`;
    texto += `Status: ${isCorrect ? "ACERTOU" : "ERROU"}\n\n`;
  });

  const total = questions.length;
  const percent = Math.round((acertos / total) * 100);

  texto = `Resultado: ${acertos}/${total} (${percent}%)\n\n` + texto;

  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "resultado_quiz.txt";
  link.click();
}

// modal explicação
document.getElementById("infoBtn").onclick = () => {
  if (!selectedQuestion) return;

  document.getElementById("modal-body").innerHTML = formatExplanation();
  document.getElementById("modal").classList.remove("hidden");
  document.body.classList.add("modal-open");
  document.body.classList.remove("modal-open");
};

function formatExplanation() {
  let html = "";

  selectedQuestion.options.forEach((opt) => {
    const color = opt.correct ? "#22c55e" : "#ef4444";

    html += `<p style="margin-bottom:10px;">
      <strong style="color:${color}">${opt.text}</strong><br>
      ${opt.comment}
    </p>`;
  });

  return html;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("nextBtn").onclick = () => {
  nextQuestion();
};

function resetQuiz() {
  localStorage.removeItem("quiz_state");
  answered = {};
  current = 0;

  loadQuestion(0);
  updateProgress();
  updateMenu();
}

function resetCurrentQuestion() {
  delete answered[current];

  localStorage.setItem("quiz_state", JSON.stringify(answered));

  loadQuestion(current);
  updateMenu();
  updateProgress();
}
