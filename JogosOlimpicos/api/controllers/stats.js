var Stats = module.exports
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


Stats.getTop20 = async function(){
    var query = `select ?atleta ?idAtleta ?equipa ?desporto (count(distinct ?evento) as ?numMedals) 
        (count(distinct ?ouro) as ?numOuros) (count(distinct ?prata) as ?numPratas) 
        (count(distinct ?bronze) as ?numBronzes) where {
            ?atl a c:Atleta.
            ?atl c:medalhou ?evento.
            optional{ ?atl c:ganhouMedalhaOuro ?ouro. }
            optional { ?atl c:ganhouMedalhaPrata ?prata. }
            optional { ?atl c:ganhouMedalhaBronze ?bronze. }
            ?evento c:desporto ?desporto .
            ?atl c:nome ?atleta.
            ?atl c:pertence ?eq .
            ?eq  c:designacao ?equipa .
        bind(strafter(str(?atl), 'jogosOlimpicos#') as ?idAtleta)
        }
    group by ?atleta ?idAtleta ?equipa ?desporto
    order by DESC(?numMedals)
    limit 20 ` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Stats.getDesportos = async function(){
    var query = `select distinct ?desporto where {
        ?e a c:Evento .
        ?e c:desporto ?desporto .
    }
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

Stats.getTop10DoDesporto = async function(desporto){
    var query = `select ?atleta ?idAtleta ?equipa (count(distinct ?evento) as ?numMedals) 
    (count(distinct ?ouro) as ?numOuros) (count(distinct ?prata) as ?numPratas) 
    (count(distinct ?bronze) as ?numBronzes) where {
        ?atl a c:Atleta.
        ?atl c:medalhou ?evento.
        optional{ ?atl c:ganhouMedalhaOuro ?ouro. }
        optional { ?atl c:ganhouMedalhaPrata ?prata. }
        optional { ?atl c:ganhouMedalhaBronze ?bronze. }
        ?evento c:desporto "${desporto}" .
        ?atl c:nome ?atleta.
        ?atl c:pertence ?eq .
        ?eq  c:designacao ?equipa .
    bind(strafter(str(?atl), 'jogosOlimpicos#') as ?idAtleta)
    }
    group by ?atleta ?idAtleta ?equipa
    order by DESC(?numMedals)
    limit 10` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}




