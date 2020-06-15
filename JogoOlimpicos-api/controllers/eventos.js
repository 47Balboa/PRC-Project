var Eventos = module.exports
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


Eventos.getLista = async function(){
    
    var query = ` select ?event ?idEvento ?designacao ?desporto ?jogosOlimpicos  where{

        ?event a c:Evento.
        ?event c:designacao ?designacao.
        ?event c:desporto ?desporto.
        ?event c:fazParteDe ?jog.
        bind(strafter(str(?event), 'jogosOlimpicos#') as ?idEvento) .
        bind(strafter(str(?jog), 'jogosOlimpicos#') as ?jogosOlimpicos) .
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


Eventos.getAtletasDoEvento = async function(idEvento){
    var query = `select ?idAtleta ?atleta where {
        c:${idEvento} a c:Evento .
        ?at a c:Atleta.
        ?at c:participou c:${idEvento}.
        ?at c:nome ?atleta.
        bind(strafter(str(?at), 'jogosOlimpicos#') as ?idAtleta) .
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

Eventos.getPodioDoEvento = async function(idEvento){
    var query = `select distinct ?idEvento ?designacao 
    (group_concat(distinct ?onome; separator = ';') as ?onomes) 
    (group_concat(distinct ?pnome; separator = ';') as ?pnomes)
    (group_concat(distinct ?bnome; separator = ';') as ?bnomes) where{
        c:${idEvento} a c:Evento .
        c:${idEvento} c:designacao ?designacao .
        optional{ 
            c:${idEvento} c:primeiroLugar ?ouro .
            ?ouro c:nome ?onome.
         }
        optional{ 
            c:${idEvento} c:segundoLugar ?prata .
            ?prata c:nome ?pnome.
         }
        optional{ 
            c:${idEvento} c:terceiroLugar ?bronze .
            ?bronze c:nome ?bnome.
        }
       
    } group by ?idEvento ?designacao ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}


async function getEventoAtomica(idEvento){
    var query = `select ?designacao ?desporto ?jogo where {
        c:${idEvento} a c:Evento .
        c:${idEvento} c:designacao ?designacao .
        c:${idEvento} c:desporto ?desporto .
        c:${idEvento} c:fazParteDe ?jogo .
        
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



Eventos.getEvento = async function(idEvento){
    try{
        var atomica = await getEventoAtomica(idEvento)
        var atletas = await Eventos.getAtletasDoEvento(idEvento)
        var podio = await Eventos.getPodioDoEvento(idEvento)
        var evento = {
          //nome do campo: variável
            info : atomica[0],
            atletas: atletas,
            podio: podio[0]
        }
        return evento
    }
    catch(e){
        throw(e)
    } 
}
