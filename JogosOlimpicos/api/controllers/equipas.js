var Equipas = module.exports
const axios = require('axios')

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

Equipas.getAtletasDaEquipa = async function(idEquipa){
    var query = `select ?atleta ?idAtleta ?nome where{
        c:${idEquipa} a c:Equipa.
        c:${idEquipa} c:temAtleta ?atleta.
    	?atleta c:nome ?nome.   
        
        bind(strafter(str(?atleta), 'jogosOlimpicos#') as ?idAtleta) .
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

Equipas.getJogosDaEquipa = async function(idEquipa){ // NAo consegui fazer o distinct (erro de memoria)
    var query = `select distinct ?jogo ?idJogo where{
        c:${idEquipa} a c:Equipa.
    	c:${idEquipa} c:temAtleta ?atleta.
    	?atleta c:participou ?evento.
    	?evento c:fazParteDe ?jogo.
    
        bind(strafter(str(?jogo), 'jogosOlimpicos#') as ?idJogo) .
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
        var atletas = await Equipas.getAtletasDaEquipa(idEquipa)
        var jogos  =  await Equipas.getJogosDaEquipa(idEquipa)
        
        var equipa = {
          //nome do campo: variável
            info : atomica[0],
            eventos: eventos,
            atletas: atletas,
            jogos: jogos
        }
        return equipa
    }
    catch(e){
        throw(e)
    } 
}