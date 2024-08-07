// controllers/process/SellProcessingController.js

class SellProcessingController {
    constructor(sellProcessingService) {
      this.sellProcessingService = sellProcessingService;
    }
  
    async create(req, res) {
      const {requisitionId, tipoPagamento} = req.body;
      const userId = req.userId;
      try {
        const result = await this.sellProcessingService.create(
          userId, requisitionId, tipoPagamento
        );
        res.status(200).json(result);
      } catch (error) {
        console.error('Erro no controlador ao criar:', error);
        res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
      }
    }


  }
  
  module.exports = SellProcessingController;
  