//service/titleService.js


class TitleService {
    constructor(TitleModel) {
        this.Title = TitleModel;
       
    }
    
   

    //--------------------------------------------------------------------------------------------------//
    
    async create(qtd_parcela, valorOriginal,  status, notafiscalId ) {
        try {
        
            const result = await this.Title.create({ 
                qtd_parcela, valorOriginal,  status, notafiscalId 
            },
        
        );
            return result;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async update(id, updates) {
        try {
            // Verificar se o ID fornecido é válido
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
    
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.Title.update(updates, {
                where: { id },
            });
            // Verificar se algum registro foi atualizado
            if (updatedRowsCount === 0) {
                throw new Error("Nenhum registro encontrado para atualização");
            } else {
                // Retornar algo específico para indicar que a atualização foi bem-sucedida
                return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
            }
        } catch (error) {
            // Lançar novamente o erro para ser tratado na camada de controle
            throw error;
        }
            
    }
  
  
    //--------------------------------------------------------------------------------------------------//
  
    async findAll(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
        
            const result = await this.Title.findAndCountAll({
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
            const result = await this.Title.findOne({ where: { id } });
            return result;
        } catch (error) {
            throw error;
        }
    }
  
    //--------------------------------------------------------------------------------------------------//
    
    async delete(id) {
        try {
          const result = await this.Title.destroy({
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
  
  module.exports = TitleService;
  