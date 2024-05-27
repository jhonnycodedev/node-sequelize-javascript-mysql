// ./services/requisitionService.js
class RequisitionService {
  constructor(RequisitionModel) {
      this.Requisition = RequisitionModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(qtd_requerida, status, userId, productId, costCenterId) {
      try {
          const newRequisition = await this.Requisition.create({ qtd_requerida, status, userId, productId, costCenterId });
          return newRequisition;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async update(id, updates) {
      try {
          if (!id) {
              throw new Error("ID inválido para atualização");
          }

          const [updatedRowsCount, updatedRows] = await this.Requisition.update(updates, {
              where: { id },
          });

          if (updatedRowsCount === 0) {
              throw new Error("Nenhum registro encontrado para atualização");
          } else {
              return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
          }
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findAllRequisition(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const requisitions = await this.Requisition.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return requisitions;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findRequisitionById(id) {
      try {
          const requisition = await this.Requisition.findOne({ where: { id } });
          return requisition;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getPosicaoByDeposito(depositoId) {
      try {
          const posicao = await this.Requisition.findAll({
              include: [{
                  model: this.Moviments,
                  where: { depositId: depositoId }
              }]
          });
          return posicao;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async getPosicaoByProdutoDeposito(produtoId, depositoId) {
      try {
          const posicao = await this.Requisition.findOne({
              include: [{
                  model: this.Moviments,
                  where: { productId: produtoId, depositId: depositoId }
              }]
          });
          return posicao;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async delete(id) {
    try {
      const result = await this.Requisition.destroy({
        where: { id: id }
      });
  
      if (result === 0) {
        throw new Error('Registro não encontrado');
      }
  
      return { message: 'Registro deletado com sucesso' };
    } catch (error) {
      throw error;
    }
}

}

module.exports = RequisitionService;
