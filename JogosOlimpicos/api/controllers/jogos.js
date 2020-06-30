var Jogos = module.exports
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


Jogos.getLista = async function(){
    
    var query = `select ?jogo ?idJogo ?designacao ?cidade ?ano ?temporada where{
        ?jogo a c:JogoOlimpico.
        ?jogo c:designacao ?designacao.
        ?jogo c:cidade ?cidade.
        ?jogo c:ano ?ano.
        ?jogo c:temporada ?temporada.
        
        bind(strafter(str(?jogo), 'jogosOlimpicos#') as ?idJogo) .
    } order by ?ano ` 

    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}


Jogos.getEventosDoJogo = async function(idJogo){
    var query = `select  ?idEvento ?evento  ?designacao ?idEvento where {
        c:${idJogo} a c:JogoOlimpico.
        c:${idJogo} c:temEvento ?evento.
        ?evento c:designacao ?designacao.
    
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

Jogos.getEventosDoJogoPorDesporto = async function(idJogo){
    var query = `select ?desporto 
    (group_concat(distinct ?idEvento; separator = ';') as ?ids) 
    (group_concat(distinct ?designacao; separator = ';') as ?designacoes) where{
        c:${idJogo} a c:JogoOlimpico.
        c:${idJogo} c:temEvento ?evento.
        ?evento c:designacao ?designacao.
        ?evento c:desporto ?desporto .
    bind(strafter(str(?evento), 'jogosOlimpicos#') as ?idEvento) .
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

Jogos.getAtletasDoJogoPorEquipa = async function(idJogo){
    var query = `select ?equipa ?idEquipa (group_concat(distinct ?idAtleta; separator = ';') as ?ids) (group_concat(distinct ?nome; separator = ';') as ?nomes) where{
        c:${idJogo} a c:JogoOlimpico.
        c:${idJogo} c:temEvento ?evento.
        ?atleta c:participou ?evento.
        ?atleta c:pertence ?eq .
        ?atleta c:nome ?nome .
        ?eq c:designacao ?equipa .
    bind(strafter(str(?atleta), 'jogosOlimpicos#') as ?idAtleta) .
    bind(strafter(str(?eq), 'jogosOlimpicos#') as ?idEquipa) .
    }
    group by ?equipa ?idEquipa
    order by ?equipa` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}



Jogos.getAtletasDoJogo = async function(idJogo){
    var query = `select distinct ?atleta ?idAtleta ?nome where{

        c:${idJogo} rdf:type c:JogoOlimpico.
        c:${idJogo} c:temEvento ?evento.
        ?atleta c:participou ?evento.
        ?atleta c:nome ?nome.
          
      
        bind(strafter(str(?atleta), 'jogosOlimpicos#') as ?idAtleta) .  
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

Jogos.getEquipasDoJogo = async function(idJogo){
    var query = `select distinct ?idEquipa ?equipa ?designacao where{ 	
    	c:${idJogo} a c:JogoOlimpico.
		c:${idJogo} c:temEvento ?evento.
		?atleta c:participou ?evento.
		?atleta c:pertence ?equipa.
    	?equipa c:designacao ?designacao.
         
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


async function getJogoAtomica(idJogo){
    var query = `select ?designacao ?cidade ?ano ?temporada  where {
        c:${idJogo} a c:JogoOlimpico .
        c:${idJogo} c:designacao ?designacao .
        c:${idJogo} c:cidade ?cidade .
        c:${idJogo} c:ano ?ano .
        c:${idJogo} c:temporada ?temporada.      
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



Jogos.getJogo = async function(idJogo){
    try{
        var atomica = await getJogoAtomica(idJogo)
        var eventos = await Jogos.getEventosDoJogoPorDesporto(idJogo)
        var atletas = await Jogos.getAtletasDoJogoPorEquipa(idJogo)
        var equipas = await Jogos.getEquipasDoJogo(idJogo)
        var atleta = {
          //nome do campo: variável
            info : atomica[0],
            eventos: eventos,
            atletas: atletas,
            equipas: equipas

        }
        return atleta
    }
    catch(e){
        throw(e)
    } 
}