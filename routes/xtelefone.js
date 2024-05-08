const express = require('express');
const router = express.Router();

const db = require('../models');
const XtelefoneService = require('../services/xtelefoneService');
const XtelefoneController = require('../controllers/xtelefoneController');
const AuthenticateToken = require('../services/authenticateToken');
const authenticateToken = new AuthenticateToken('sua_chave_secreta');

// Instanciando o serviço e o controlador
const xtelefoneService = new XtelefoneService(db.Xtelefone);
const xtelefoneController = new XtelefoneController(xtelefoneService);

//--------------------------------------------------------------------------------------------------//
// Rotas que exigem autenticação
router.post('/newxtelefone', authenticateToken.verifyToken, (req, res) => {
  xtelefoneController.create(req, res);
});


// Rota de atualização
router.put('/updateXtelefone/:id', (req, res, next) => {
  xtelefoneController.update(req, res);
});

router.get('/findallxtelefones', (req, res, next) => {
  xtelefoneController.findAllXtelefones(req, res);
});

router.get('/findXtelefonebyId/:id', (req, res, next) => {
    xtelefoneController.findXtelefoneById(req, res);
  });


//--------------------------------------------------------------------------------------------------//
module.exports = router;
