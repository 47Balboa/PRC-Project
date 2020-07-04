var Atletas = module.exports
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
    var query = `select  ?idEvento ?designacao ?desporto ?jogo where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:participou ?evento .
        ?evento c:designacao ?designacao .
        ?evento c:desporto ?desporto .
        ?game c:temEvento ?evento .
        ?game c:designacao ?jogo .
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

async function getMedalhasOuro(idAtleta){
    var query = `select ?idevento ?evento where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:ganhouMedalhaOuro ?o .
        ?o c:designacao ?evento.
        bind(strafter(str(?o), 'jogosOlimpicos#') as ?idevento) .
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

async function getMedalhasPrata(idAtleta){
    var query = `select ?idevento ?evento where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:ganhouMedalhaPrata ?o .
        ?o c:designacao ?evento.
        bind(strafter(str(?o), 'jogosOlimpicos#') as ?idevento) .
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

async function getMedalhasBronze(idAtleta){
    var query = `select ?idevento ?evento where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:ganhouMedalhaBronze ?o .
        ?o c:designacao ?evento.
        bind(strafter(str(?o), 'jogosOlimpicos#') as ?idevento) .
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
    try{
        var ouro = await getMedalhasOuro(idAtleta)
        var prata = await getMedalhasPrata(idAtleta)
        var bronze = await getMedalhasBronze(idAtleta)
        var medalhas = {
          //nome do campo: variável
            ouro : ouro,
            prata: prata,
            bronze: bronze
        }
        return medalhas
    }
    catch(e){
        throw(e)
    } 
}


async function getAtletaAtomica(idAtleta){
    var query = `select ?nome ?idade ?altura ?peso ?sexo ?idEquipa ?equipa where {
        c:${idAtleta} a c:Atleta .
        c:${idAtleta} c:nome ?nome .
        c:${idAtleta} c:sexo ?sexo .
        optional{ c:${idAtleta} c:idade ?idade . }
        optional{ c:${idAtleta} c:altura ?altura . }
        optional{ c:${idAtleta} c:peso ?peso .}
        c:${idAtleta} c:pertence ?eq .
        ?eq c:designacao ?equipa .
        bind(strafter(str(?eq), 'jogosOlimpicos#') as ?idEquipa) .
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

async function getDesportosAtleta(idAtleta){
    var query = `select distinct ?desporto where {
            c:${idAtleta} a c:Atleta.
            c:${idAtleta} c:participou ?evento .
    		?evento c:desporto ?desporto .
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
        var desportos = await getDesportosAtleta(idAtleta)
        atomica[0].flagCode = countrynames.getCode(atomica[0].equipa)
        var atleta = {
            info : atomica[0],
            eventos: eventos,
            medalhas: medalhas,
            desportos: desportos
        }
        return atleta
    }
    catch(e){
        throw(e)
    } 
}