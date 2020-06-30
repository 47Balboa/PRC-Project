var Equipas = module.exports
const axios = require('axios')
const countrynames = require('countrynames')

function myNormalize(r) {
    return r.results.bindings.map(o =>{
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
        }
        return novo;
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.semanticweb.org/asus/ontologies/2020/5/jogosOlimpicos#>
`

var getLink = "http://localhost:7200/repositories/JogosOlimpicos" + "?query=" 


Equipas.getLista = async function(){
    
    var query = `select ?equipa ?idEquipa ?designacao where{
    ?equipa a c:Equipa.
    ?equipa c:designacao ?designacao .
    bind(strafter(str(?equipa), 'jogosOlimpicos#') as ?idEquipa) .
    
} ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Equipas.getEventosDaEquipa = async function(idEquipa){
    var query = `select distinct ?evento ?idEvento ?designacao  where{
        c:${idEquipa} a c:Equipa.
    	c:${idEquipa} c:temAtleta ?atleta.
    	?atleta c:participou ?evento.
    	?evento c:designacao ?designacao.
    	
        bind(strafter(str(?evento), 'jogosOlimpicos#') as ?idEvento) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Equipas.getAtletasDaEquipaPorDesporto = async function(idEquipa){
    var query = `select ?desporto 
    (group_concat(distinct ?idAtleta; separator = ';') as ?ids)
    (group_concat(distinct ?nome; separator = ';') as ?nomes) where{
        c:${idEquipa} a c:Equipa.
        c:${idEquipa} c:temAtleta ?atleta.
    	?atleta c:nome ?nome. 
        ?atleta c:participou ?evento .
        ?evento c:desporto ?desporto .
        bind(strafter(str(?atleta), 'jogosOlimpicos#') as ?idAtleta) .
    }
    group by ?desporto 
    order by ?desporto` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

async function getContagemOuros(idEquipa){
    var query = `select (count(distinct ?ev) as ?numMedalhas) where{
        c:${idEquipa} a c:Equipa.
        c:${idEquipa} c:temAtleta ?atleta.
        ?atleta c:ganhouMedalhaOuro ?ev .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

async function getContagemPratas(idEquipa){
    var query = `select (count(distinct ?ev) as ?numMedalhas) where{
        c:${idEquipa} a c:Equipa.
        c:${idEquipa} c:temAtleta ?atleta.
        ?atleta c:ganhouMedalhaPrata ?ev .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

async function getContagemBronzes(idEquipa){
    var query = `select (count(distinct ?ev) as ?numMedalhas) where{
        c:${idEquipa} a c:Equipa.
        c:${idEquipa} c:temAtleta ?atleta.
        ?atleta c:ganhouMedalhaBronze ?ev .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Equipas.getJogosDaEquipa = async function(idEquipa){
    var query = `select distinct ?jogo ?idJogo where{
        c:${idEquipa} a c:Equipa.
    	c:${idEquipa} c:temAtleta ?atleta.
    	?atleta c:participou ?evento.
    	?evento c:fazParteDe ?jogo.
    
        bind(strafter(str(?jogo), 'jogosOlimpicos#') as ?idJogo) .
    } order by ?jogo` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}


async function getEquipaAtomica(idEquipa){
    var query = `select ?designacao where {
        c:${idEquipa} a c:Equipa .
        c:${idEquipa} c:designacao ?designacao .
        
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Equipas.getEquipa = async function(idEquipa){
    try{
        var atomica = await getEquipaAtomica(idEquipa)
        var eventos = await Equipas.getEventosDaEquipa(idEquipa)
        var atletas = await Equipas.getAtletasDaEquipaPorDesporto(idEquipa)
        var jogos  =  await Equipas.getJogosDaEquipa(idEquipa)
        var ouros = await getContagemOuros(idEquipa)
        var pratas = await getContagemPratas(idEquipa)
        var bronzes = await getContagemBronzes(idEquipa)
        
        atomica[0].flagCode = countrynames.getCode(atomica[0].designacao)
        var equipa = {
          //nome do campo: variável
            info : atomica[0],
            eventos: eventos,
            atletas: atletas,
            jogos: jogos,
            contagemMedalhas: {
                ouro: ouros[0].numMedalhas,
                prata: pratas[0].numMedalhas,
                bronze: bronzes[0].numMedalhas
            }
        }
        return equipa
    }
    catch(e){
        throw(e)
    } 
}