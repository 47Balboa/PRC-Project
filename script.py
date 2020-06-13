import csv

def writeAtleta(out, atleta):
    id = atleta['id']
    nome = atleta['nome']
    sexo = atleta['sexo']
    idade = atleta['idade']
    altura = atleta['altura']
    peso = atleta['peso']
    equipa = atleta['equipa']

    out.write(f'### http://prc.di.uminho.pt/2020/JogosOlimpicos#Atleta{id}\n')
    out.write(f':Atleta{id} rdf:type owl:NamedIndividual ,\n')
    out.write(f'\t\t\t\t :Atleta ;\n')
    out.write(f'\t\t:pertence :{equipa} ;\n')
    for event in atleta['eventos']:
        out.write(f'\t\t:participou :{event} ;\n')
        res = atleta['eventos'][event]
        if res != 'NA':
            if res == 'Gold':
                out.write(f'\t\t:ganhouMedalhaOuro :{event} ;\n')
            elif res == 'Silver':
                out.write(f'\t\t:ganhouMedalhaPrata :{event} ;\n')
            elif res == 'Bronze':
                out.write(f'\t\t:ganhouMedalhaBronze :{event} ;\n')
    if altura != 'NA':
        out.write(f'\t\t:altura {altura} ;\n')
    if peso != 'NA':
        out.write(f'\t\t:peso {peso} ;\n')
    if idade != 'NA':
        out.write(f'\t\t:idade {idade} ;\n')
    out.write(f'\t\t:sexo "{sexo}"^^xsd:string ;\n')
    out.write(f'\t\t:nome "{nome}"^^xsd:string .\n')
    out.write(f'\n\n')

def writeGame(out, game):
    id = game['temporada'] + game['ano']
    temp = game['temporada']
    year = game['ano']
    city = game['cidade']
    des = game['designacao']
    out.write(f'### http://www.semanticweb.org/asus/ontologies/2020/5/jogosOlimpicos#{id}\n')
    out.write(f':{id} rdf:type owl:NamedIndividual ,\n')
    out.write(f'\t\t\t\t :JogoOlimpico ;\n')
    out.write(f'\t\t:temporada "{temp}"^^xsd:string ;\n')
    out.write(f'\t\t:cidade "{city}"^^xsd:string ;\n')
    out.write(f'\t\t:ano {year} ;\n')
    out.write(f'\t\t:designacao "{des}"^^xsd:string .\n')
    out.write(f'\n\n')

def writeEvents(out, events):
    for i in events:
        for event in events[i]:
            id = i + str(event['index'])
            des = event['designacao']
            sport = event['desporto']
            game = event['jogo']
            out.write(f'### http://www.semanticweb.org/asus/ontologies/2020/5/jogosOlimpicos#{id}\n')
            out.write(f':{id} rdf:type owl:NamedIndividual ,\n')
            out.write(f'\t\t\t\t :Evento ;\n')
            out.write(f'\t\t:fazParteDe :{game} ;\n')
            out.write(f'\t\t:designacao "{des}"^^xsd:string ;\n')
            out.write(f'\t\t:desporto "{sport}"^^xsd:string .\n')
            out.write(f'\n\n')

def writeTeams(out, teams):
    for t in teams:
        des = teams[t]
        out.write(f'### http://www.semanticweb.org/asus/ontologies/2020/5/jogosOlimpicos#{t}\n')
        out.write(f':{t} rdf:type owl:NamedIndividual ,\n')
        out.write(f'\t\t\t\t :Equipa ;\n')
        out.write(f'\t\t:designacao "{des}"^^xsd:string .\n')
        out.write(f'\n\n')

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
            ##Para guardar os eventos
            eventID = row[8].replace(' ','') + row[12].replace(' ','').replace('-','')
            if eventID not in events:
                val = []
                ev = {}
                ev['designacao'] = row[13]
                ev['desporto'] = row[12]
                ev['jogo'] = gameID
                ev['index'] = 1
                val.append(ev)
                events[eventID] = val
                e = eventID + str(ev['index'])
            else:
                found = False
                es = events[eventID]
                for i in range(len(es)): 
                    if es[i]['designacao'] == row[13]:
                        found = True
                        e = eventID + str(es[i]['index'])
                if found == False:
                    ev = {}
                    ev['designacao'] = row[13]
                    ev['desporto'] = row[12]
                    ev['jogo'] = gameID
                    ev['index'] = len(events[eventID]) + 1
                    events[eventID].append(ev)
                    e = eventID + str(ev['index'])
            #Guarda as equipas
            teams[row[7]] = row[6]

            if previousAtleta != row[0]:
                if previousAtleta != -1:
                    writeAtleta(output, curAtleta) ##se vai começar um novo, escreve o anterior
                    curAtleta = {}
                curAtleta['id'] = row[0]
                curAtleta['nome'] = row[1].replace('"', '\'')
                curAtleta['sexo'] = row[2]
                curAtleta['idade'] = row[3]
                curAtleta['altura'] = row[4]
                curAtleta['peso'] = row[5]
                curAtleta['equipa'] = row[7]
                curAtleta['eventos'] = {}
                if e != '':
                    curAtleta['eventos'][e] = row[14]
                previousAtleta = row[0]
            else: 
                curAtleta['idade'] = row[3]
                if e != '':
                    curAtleta['eventos'][e] = row[14]
        linha += 1
    writeAtleta(output, curAtleta)
    writeEvents(output, events)
    writeTeams(output, teams)
    output.close()