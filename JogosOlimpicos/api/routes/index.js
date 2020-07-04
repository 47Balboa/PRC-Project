var express = require('express');
var router = express.Router();
var Atletas = require('../controllers/atletas')
var Eventos = require('../controllers/eventos')
var Jogos = require('../controllers/jogos')
var Equipas = require('../controllers/equipas')
var Stats = require('../controllers/stats')

//Atletas

router.get('/atletas', function(req, res, next) {
  Atletas.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atletas: ${e}`))
});

router.get('/atletas/:id/eventos', function(req, res, next) {
  Atletas.getEventosDoAtleta(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos eventos do atleta: ${e}`))
});

router.get('/atletas/:id/medalhas', function(req, res, next) {
  Atletas.getMedalhasDoAtleta(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das medalhas do atleta: ${e}`))
});

router.get('/atletas/:id', function(req, res, next) {
  Atletas.getAtleta(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do atleta ${req.params.id}: ${e}`))
});

//Eventos

router.get('/eventos', function(req, res, next) {
  Eventos.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos eventos: ${e}`))
});

router.get('/eventos/:id/atletas', function(req, res, next) {
  Eventos.getAtletasDoEvento(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atletas do evento: ${e}`))
});

router.get('/eventos/:id/podio', function(req, res, next) {
  Eventos.getPodioDoEvento(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do pódio do evento: ${e}`))
});

router.get('/eventos/:id', function(req, res, next) {
  Eventos.getEvento(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do evento ${req.params.id}: ${e}`))
});

//Jogos

router.get('/jogos', function(req, res, next) {
  Jogos.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos jogos: ${e}`))
});

router.get('/jogos/:id/eventos', function(req, res, next) {
  Jogos.getEventosDoJogoPorDesporto(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos eventos do Jogo: ${e}`))
});


router.get('/jogos/:id/atletas', function(req, res, next) {
  Jogos.getAtletasDoJogoPorEquipa(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atletas do Jogo: ${e}`))
});

///NAO VAI SER USADA
router.get('/jogos/:id/equipas', function(req, res, next) {
  Jogos.getEquipasDoJogo(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das equipas que participaram no JogoOlimpico ${req.params.id}: ${e}`))
});

router.get('/jogos/:id', function(req, res, next) {
  Jogos.getJogo(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do JogoOlimpico ${req.params.id}: ${e}`))
});


router.get('/jogos/:id/contagem', function(req, res, next) {
  Jogos.getContagemMedalhasDoJogo(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das equipas que participaram no JogoOlimpico ${req.params.id}: ${e}`))
});


//Equipas

router.get('/equipas', function(req, res, next) {
  Equipas.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das equipas: ${e}`))
});

router.get('/equipas/:id/eventos', function(req, res, next) {
  Equipas.getEventosDaEquipa(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos eventos em que a Equipa participou: ${e}`))
});

router.get('/equipas/:id/atletas', function(req, res, next) {
  Equipas.getAtletasDaEquipaPorDesporto(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atletas da Equipa: ${e}`))
});

router.get('/equipas/:id/jogos', function(req, res, next) {
  Equipas.getJogosDaEquipa(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos jogos em que a Equipa participou: ${e}`))
});

router.get('/equipas/:id', function(req, res, next) {
  Equipas.getEquipa(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem da Equipa ${req.params.id}: ${e}`))
});


//STATS

router.get('/stats/top20', function(req, res, next) {
  Stats.getTop20()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do Top 20: ${e}`))
});

router.get('/stats/desportos', function(req, res, next) {
  Stats.getDesportos()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos desportos: ${e}`))
});

router.get('/stats/:desporto/top10', function(req, res, next) {
  Stats.getTop10DoDesporto(req.params.desporto)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do Top 10: ${e}`))
});

router.get('/stats/desportos/top10atletas', function(req, res, next) {
  Stats.getTop10DesportosMaisAtletas()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do Top 10: ${e}`))
});

router.get('/stats/desportos/top10equipas', function(req, res, next) {
  Stats.getTop10DesportosMaisEquipas()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do Top 10: ${e}`))
});


module.exports = router;


