//services/process/DepartmentProcessingService.js



class DepartmentProcessingService {
    constructor(DepartmentModel, CostCenterModel, sequelize) {
        this.Department = DepartmentModel;
        this.CostCenter = CostCenterModel;
        this.sequelize = sequelize;

    }
    async create(nome) {
    
        const transaction = await this.Department.sequelize.transaction();
        try {
            const department = await this.Department.create({ nome }, { transaction });
            const firstLetter = nome.charAt(0).toUpperCase();
            
            const codigo = `CC${firstLetter}${('01')}`;
            const costCenter = await this.CostCenter.create({ codigo, departmentId: department.id }, { transaction });
    
            await transaction.commit();
            return { department, costCenter };
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao criar departamento e centro de custo:', error);
            throw error;
        }
        }
}

module.exports = DepartmentProcessingService;


