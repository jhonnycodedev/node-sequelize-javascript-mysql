//./routes/users.js

const express = require('express');
const router = express.Router();

const db = require('../models');
const UserService = require('../services/moduloUsuarios/userService');
const AuthenticateToken = require('../services/authenticateToken');
const UserController = require('../controllers/moduloUsuarios/userController');

const secretKey = 'SUA_CHAVE_SECRETA'; // Chave secreta do token JWT

const authenticateToken = new AuthenticateToken(secretKey);
const userService = new UserService(db.User, authenticateToken);
const userController = new UserController(userService);

//--------------------------------------------------------------------------------------------------//
router.get('/', (req, res, next) => {
  res.send('Módulo de usuários está rodando');
});

router.post('/new', (req, res, next) => {
  userController.create(req, res);
});

router.post('/login', (req, res, next) => {
  userController.loginUser(req, res);
});

// Rota de atualização
router.put('/update/:id', authenticateToken.verifyToken.bind(authenticateToken),(req, res, next) => {
  userController.update(req, res);
});

router.get('/findall', authenticateToken.verifyToken.bind(authenticateToken), (req, res, next) => {
  userController.findAllUser(req, res);
})

router.get('/findbyId/:id', (req, res, next) => {
  userController.findUserbyId(req, res);
});

router.delete('/delete/:id', (req, res, next) => {
  userController.delete(req, res);
});

//--------------------------------------------------------------------------------------------------//

module.exports = router;
