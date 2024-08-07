// ./services/quotationService.js
class QuotationService {
  constructor(QuotationModel) {
      this.Quotation = QuotationModel;
  }

  //--------------------------------------------------------------------------------------------------//

  async create(preco, cotacaoData, validadeCotacao, supplierId, requisitionId) {
    try {
      
        const result = await this.Quotation.create(
            preco,
            cotacaoData,
            validadeCotacao,
            supplierId,
            requisitionId
        );

        return result;
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

          const [updatedRowsCount, updatedRows] = await this.Quotation.update(updates, {
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

  async findAll(page = 1, pageSize = 10) {
      try {
          const offset = (page - 1) * pageSize;
          const result = await this.Quotation.findAndCountAll({
              limit: pageSize,
              offset: offset
          });
          return result;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//

  async findById(id) {
      try {
          const result = await this.Quotation.findOne({ where: { id } });
          return result;
      } catch (error) {
          throw error;
      }
  }

  //--------------------------------------------------------------------------------------------------//
  
  async delete(id) {
    try {
      const result = await this.Quotation.destroy({
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

    //--------------------------------------------------------------------------------------------------//
  
    async getQuotationsBySupplier(supplierId, page = 1, pageSize = 10) {
        try {
          const offset = (page - 1) * pageSize;
          const quotations = await this.Quotation.findAndCountAll({
            where: { supplierId: supplierId },
                limit: pageSize,
                offset: offset
            
            });
          return quotations;
        } catch (error) {
          console.error('Error fetching quotations for supplier:', error);
          throw new Error('Failed to fetch quotations for supplier');
        }
      }
      

    //--------------------------------------------------------------------------------------------------//
    
    async getQuotationsByRequisition(requisitionId, page = 1, pageSize = 10) {
        try {
          const offset = (page - 1) * pageSize;
          const quotations = await this.Quotation.findAndCountAll({
            where: { requisitionId: requisitionId },
                limit: pageSize,
                offset: offset
            });
          return quotations;
        } catch (error) {
          console.error('Error fetching quotations for requisition:', error);
          throw new Error('Failed to fetch quotations for requisition');
        }
      }
      

    //--------------------------------------------------------------------------------------------------//

}

module.exports = QuotationService;
