import csv

###ta com namespace mal e nao ta a buscar cenas da variavel, so ta como exemplo de como escrever
def writeAtleta(out, atleta):
    out.write(f'### http://prc.di.uminho.pt/2020/JogosOlimpicos#Atleta{row[0]}\n')
    out.write(f':Atleta{row[0]} rdf:type owl:NamedIndividual ,\n')
    out.write(f'\t\t\t\t :Atleta ;\n')
    out.write(f'\t\t:pertence :{row[7]} ;\n')
    if row[4] != 'NA':
        out.write(f'\t\t:altura {row[4]} ;\n')
    if row[5] != 'NA':
        out.write(f'\t\t:peso {row[5]} ;\n')
        out.write(f'\t\t:idade {row[3]} ;\n')
        out.write(f'\t\t:sexo "{row[2]}"^^xsd:string ;\n')
        out.write(f'\t\t:nome "{row[1]}"^^xsd:string .\n')
        out.write(f'\n\n')

def writeGame(out, game):
    print("ba")


with open('athlete_events.csv') as tabela:
    atletas = csv.reader(tabela, delimiter=',')
    output = open("individuos.ttl","w")
    events = {}
    teams = {}
    games = {}
    linha = 0
    curAtleta = {}
    previousAtleta = -1
    for row in atletas:
        if linha > 0:
            ##Para escrever os jogos
            gameID = row[10] + row[9]
            if gameID not in games:
                g = {}
                g['designacao'] = row[8]
                g['ano'] = row[9]
                g['temporada'] = row[10]
                g['cidade'] = row[11]
                games[gameID] = g
                writeGame(output,games[gameID]) 
            ##Para guardar os eventos, depois no fim escreve se evento que vai ter id: e + events[e][0] e fazParteDe :events[e][1]
            e = row[8].replace(' ','') + row[12].replace(' ','')
            if e not in events:
                events[e] = (1, gameID)
            else:
                numEventos = events[e][0]
                events[e] = (numEventos+1,gameID)
            #Guarda as equipas e depois num for percorre se e escreve se tbm
            teams[row[7]] = row[6]

            if previousAtleta != row[0]:
                writeAtleta(output, curAtleta) ##se vai começar um novo, escreve o anterior
                curAtleta = {}
                curAtleta['id'] = row[0]
                curAtleta['nome'] = row[1]
                curAtleta['sexo'] = row[2]
                curAtleta['idade'] = row[3]
                curAtleta['altura'] = row[4]
                curAtleta['peso'] = row[5]
                curAtleta['equipa'] = row[7]
                e = e + events[e]
                curAtleta[e] = row[14]
            else: ## quando há repetiçoes as unicas coisas que mudam sao a idade, jogos e eventos
                curAtleta['idade'] = row[3]
                e = e + events[e]
                curAtleta[e] = row[14]
        linha += 1
    output.close()