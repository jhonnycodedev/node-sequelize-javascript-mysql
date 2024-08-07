// ./controllers/QuotationController.js

class QuotationController {
  constructor(quotationService) {
      this.quotationService = quotationService;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(req, res) {
      const { preco, cotacaoData, validadeCotacao, supplierId, requisitionId} = req.body;
      try {
          const result = await this.quotationService.create(preco, cotacaoData, validadeCotacao, supplierId, requisitionId);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao inserir a novo Registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(req, res) {
      const Id = req.params.id;
      const updates = req.body;
      try {
          if (isNaN(Id)) {
              return res.status(400).json({ error: "ID de registro inválido" });
          }

          if (!updates || Object.keys(updates).length === 0) {
              return res.status(400).json({ error: "Dados de atualização inválidos" });
          }

          const { updatedRowsCount, updatedRows } = await this.quotationService.update(Id, updates);

          if (updatedRowsCount > 0) {
              return res.status(200).json({ message: "Registro atualizado com sucesso" });
          } else {
              res.status(404).json({ error: "Registro não encontrada", updatedRowsCount, updatedRows });
          }
      } catch (error) {
          console.error("Erro ao atualizar registro:", error);
          return res.status(500).json({ error: "Erro ao atualizar registro" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAll(req, res) {
      const { page, pageSize } = req.query;
      try {
          const result = await this.quotationService.findAll(page, pageSize);
          res.status(200).json(result);
      } catch (error) {
          res.status(500).json({ error: "Erro ao buscar registros" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findById(req, res) {
      const Id = req.params.id;
      try {
          const result = await this.quotationService.findById(Id);
          if (result) {
              res.status(200).json(result);
          } else {
              res.status(404).json({ error: "Registro não encontrada" });
          }
      } catch (error) {
          res.status(500).json({ error: "Erro interno do servidor" });
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete (req, res){
    const quotationId = req.params.id;

    const quotation = await this.quotationService.delete(quotationId);
          if (quotation) {
              res.status(200).json(quotation);
          } else {
              res.status(404).json({ error: "Registro não deletado" });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
    }


  //--------------------------------------------------------------------------------------------------//

  async getquotationsbysupplier(req, res) {
    const { supplierId, page = 1, pageSize = 10 } = req.params;
    if (!supplierId) {
      return res.status(400).json({ error: "O ID do fornecedor é obrigatório" });
    }
  
    try {
      const quotations = await this.quotationService.getQuotationsBySupplier(supplierId, page, pageSize);
      if (!quotations || quotations.length === 0) {
        return res.status(404).json({ error: "Nenhuma cotação encontrada para o fornecedor" });
      }
      res.status(200).json(quotations);
    } catch(error){
      console.error('Erro no controlador ao criar:', error);
      res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
  }
  }
  

  //--------------------------------------------------------------------------------------------------//

  async getquotationbyrequisition(req, res) {
    const { requisitionId, page = 1, pageSize = 10 } = req.params;
    if (!requisitionId) {
      return res.status(400).json({ error: "O ID da requisição é obrigatório" });
    }
  
    try {
      const quotations = await this.quotationService.getQuotationsByRequisition(requisitionId, page, pageSize);
      if (!quotations || quotations.length === 0) {
        return res.status(404).json({ error: "Nenhuma cotação encontrada para a requisição" });
      }
      res.status(200).json(quotations);
    } catch (error) {
      console.error('Erro ao buscar cotações por requisição:', error);
      res.status(500).json({ error: "Erro ao buscar cotações por requisição" });
    }
  }
  

  //--
  
}

module.exports = QuotationController;
