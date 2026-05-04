const hoje = new Date();
hoje.setHours(0,0,0,0);

const itens = document.querySelectorAll(".timeline-item");

let currentIndex = -1;

itens.forEach((item, index) => {
  const dataStr = item.getAttribute("data-date");
  if (!dataStr) return;

  const [ano, mes, dia] = dataStr.split("-");
  const dataEvento = new Date(ano, mes - 1, dia);

  if (dataEvento < hoje) {
    item.classList.add("past");
  }

  if (dataEvento.getTime() === hoje.getTime()) {
    item.classList.add("current");
    currentIndex = index;
  }
});

// fallback
if (currentIndex === -1) {
  for (let i = itens.length - 1; i >= 0; i--) {
    if (itens[i].classList.contains("past")) {
      itens[i].classList.add("current");
      break;
    }
  }
}