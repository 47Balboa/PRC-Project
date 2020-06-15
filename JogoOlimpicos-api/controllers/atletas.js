var Atletas = module.exports
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


Atletas.getLista = async function(){
    
    var query = `select distinct ?atl ?idAtleta ?nome ?idade ?altura ?peso ?sexo ?equipa  where{

    ?atl a c:Atleta.
    ?atl c:nome ?nome.
    optional{ ?atl c:idade ?idade. }
    optional{ ?atl c:altura ?altura. }
    optional{ ?atl c:peso ?peso.}
    optional{ ?atl c:sexo ?sexo. }
    optional{ ?atl c:pertence ?eq. }
    bind(strafter(str(?atl), 'jogosOlimpicos#') as ?idAtleta) .
    bind(strafter(str(?eq), 'jogosOlimpicos#') as ?equipa) .
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


Atletas.getEventosDoAtleta = async function(idAtleta){
    var query = `select  ?idEvento ?designacao ?desporto where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:participou ?evento .
        ?evento c:designacao ?designacao .
        ?evento c:desporto ?desporto
        bind(strafter(str(?evento), 'jogosOlimpicos#') as ?idEvento) .
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

Atletas.getMedalhasDoAtleta = async function(idAtleta){
    var query = `select (group_concat(distinct ?ouro; separator = ';') as ?medalhasOuro) 
    (group_concat(distinct ?prata; separator = ';') as ?medalhasPrata)
    (group_concat(distinct ?bronze; separator = ';') as ?medalhasBronze) where{
        c:${idAtleta} a c:Atleta .
        optional{ 
            c:${idAtleta} c:ganhouMedalhaOuro ?o .
            ?o c:designacao ?douro.
         }
        optional{ 
            c:${idAtleta} c:ganhouMedalhaPrata ?p .
            ?p c:designacao ?dprata.
         }
        optional{ 
            c:${idAtleta} c:ganhouMedalhaBronze ?b . 
            ?b c:designacao ?dbronze.
        }
        bind(strafter(str(?o), 'jogosOlimpicos#') as ?ouro) .
        bind(strafter(str(?p), 'jogosOlimpicos#') as ?prata).
        bind(strafter(str(?b), 'jogosOlimpicos#') as ?bronze).  
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


async function getAtletaAtomica(idAtleta){
    var query = `select ?nome ?idade ?altura ?peso ?sexo where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:nome ?nome .
        c:${idAtleta} c:sexo ?sexo .
        optional{ c:${idAtleta} c:idade ?idade . }
        optional{ c:${idAtleta} c:altura ?altura . }
        optional{ c:${idAtleta} c:peso ?peso .}
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



Atletas.getAtleta = async function(idAtleta){
    try{
        var atomica = await getAtletaAtomica(idAtleta)
        var eventos = await Atletas.getEventosDoAtleta(idAtleta)
        var medalhas = await Atletas.getMedalhasDoAtleta(idAtleta)
        var atleta = {
          //nome do campo: variável
            info : atomica[0],
            eventos: eventos,
            medalhas: medalhas[0]
        }
        return atleta
    }
    catch(e){
        throw(e)
    } 
}