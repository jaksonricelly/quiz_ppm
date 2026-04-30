dados = input("Informe nome e quantidade: ").split("#")
nome = dados[0].strip().title()
quantidade = int(dados[1]) + len(nome)
print(f"{nome}:{quantidade}")