dados = input("Informe nome e quantidade: ").split("#")

nome = dados[0].strip().title()
try:
    dados[1] = int(dados[1])
    quantidade = int(dados[1]) + len(nome)
    print(f"{nome}:{quantidade}")
except TypeError:
    print("impossivel continuar, digite um numero"")

digite o usuario: "a" or "1=1""
digite sua senha: 