
1###############################
dados = input("Informe nome e quantidade: ").split("#")
nome = dados[0].strip().title()
quantidade = int(dados[1]) + len(nome)
print(f"{nome}:{quantidade}")

2#############################
dados = input("Informe nome e
quantidade: ").split("#")
nome = dados[0].strip().title()
quantidade = int(dados[1]) + len(nome)
print(f"{nome}:{quantidade}")

3##############################

a = 10
b = a
a = a + 5
c, a = b, a - b
print(a, b, c)

4############################# 

_servidores
total2026
classificacao_final
2fase
valor-total
for
média

5#############################

resultado = 18 + 5 * 2 ** 3 // 4 - 7 % 4
print(resultado)

6#############################

x = 7
y = 7.0
z = "7"
print(x == y, x is y, x == int(z))

7#############################

idade = 17
acompanhado = True
autorizacao = False
resultado = not (idade < 16 or (idade < 18
and not acompanhado)) and (autorizacao
or acompanhado)
print(resultado)

8#############################

nota = 6.8
frequencia = 74
recurso = True
if nota >= 7 and frequencia >= 75:
print("Aprovado")
elif nota >= 6.5 and frequencia >= 75:
print("Recuperação")
elif nota >= 7 or (recurso and frequencia >= 70):
print("Análise especial")
else:
print("Reprovado")

9#############################

protocolo_regular = True
documento_assinado = False
taxa_paga = True
if protocolo_regular:
if documento_assinado:
if taxa_paga:
print("Deferido")
else:
print("Aguardando pagamento")
else:
if taxa_paga:
print("Aguardando assinatura")
else:
print("Pendência dupla")
else:
print("Protocolo inválido")

10#############################

status = ("financeiro", 2)
match status:
case ("financeiro", 0):
print("Sem pendência")
case ("financeiro", x) if x > 0:
print(x * 10)
case ("acadêmico", 1 | 2):
print("Ajuste interno")
case _:
print("Revisão manual")


11#############################

total = 0
for setor in range(1, 4):
for lote in range(setor, setor + 2):
total += lote
print(total)

12#############################

x = 7
x += 3
x *= x - 4
x //= 2
print(x)

13#############################

fila = [3, 6, 9, 12]
fila[1:3] = [7, 8, 9]
fila.pop(-2)
fila.append(fila[0] + fila[-1])
print(fila)

14#############################

matriz = [[1, 2]] * 2
matriz[0][1] = 9
matriz[1] = [3, 4]
print(matriz)

15#############################

total = 0
for n in range(3, 10):
total += n
if total > 15:
break
print(n, total)

16############################# 

codigo = "2026"
valido = len(codigo) == 4
resultado = valido + False
print(type(resultado))

17############################# 

resultado = 27 // 4 + 2 * 3 ** 2 - 5 % 3
print(resultado)

18#############################

x = 5
y = 5.0
z = "5"
print(x == y, x != int(z), x is not y)


19##############################

servidor_ativo = False
backup_ok = True
janela_manutencao = False
print((servidor_ativo or backup_ok) and
not janela_manutencao and
(servidor_ativo or not servidor_ativo))

20##############################

nota = 6.4
frequencia = 72
recurso_deferido = True
if nota >= 7 and frequencia >= 75:
print("Classificado")
elif nota >= 6 and frequencia >= 75:
print("Cadastro de reserva")
elif recurso_deferido and nota >= 6 and
frequencia >= 70:
print("Classificado por recurso")
else:
print("Eliminado")

21############################### 

total = 0
for i in range(1, 4):
for j in range(1, i + 2):
total += i * j
print(total)

22##############################

dados = [parte.strip() for parte in
input("Informe os dados: ").split(";")]
codigo = dados[0].split("-")[-1][-2:]
volumes = int(dados[1]) // 3
print(f"{codigo}-{volumes}")


23###############################

soma = 0
for n in range(2, 11):
if n % 3 == 0:
continue
soma += n
if soma > 20:
break
print(soma)

24###############################

fila = [2, 4, 6, 8, 10]
fila[2] = fila[0] + fila[-1]
fila.insert(1, fila.pop(3))
del fila[-2]
print(fila[1:])

25###############################

matriz = [
[0, 1, 2],
[3, 4, 5]
]
matriz[0][2] = matriz[1][0] + matriz[0][1]
matriz[1].append(matriz[0][2] - matriz[1][1])
print(matriz[0][2] + matriz[1][2] + matriz[1][3])
