// ./services/requisitionService.js
class RequisitionService {
    constructor(RequisitionModel) {
      this.Requisition = RequisitionModel;
    }

    //--------------------------------------------------------------------------------------------------//
  
    async create(data) {
      return this.Requisition.create(data);
    }
  
    async update(id, data) {
      return this.Requisition.update(data, { where: { id } });
    }
  
    async findAll() {
      return this.Requisition.findAll({
        include: ['user', 'product', 'costCenter'],
      });
    }
  
    async findById(id) {
      return this.Requisition.findByPk(id, {
        include: ['user', 'product', 'costCenter'],
      });
    }
  
    async delete(id) {
      return this.Requisition.destroy({ where: { id } });
    }
  }

  //--------------------------------------------------------------------------------------------------//
  
  
  module.exports = RequisitionService;
  