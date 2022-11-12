const Joi = require('joi')

 const departamentoShema=Joi.object({
    nombre:Joi.string().min(1).max(100).required(),
    presupuesto:Joi.number().required()
    
})

 const empleadosShema=Joi.object({
nombre:Joi.string().min(1).max(100).required(),
apellido1:Joi.string().min(1).max(100).required(),
apellido2:Joi.string().min(1).max(100).required(),
direccion:Joi.string().min(1).max(50).required(),
telefono:Joi.string().min(7).max(10).required(),
puesto:Joi.string().min(1).max(15).required(),
//puesto:Joi.string().min(1).max(10).require(),
fk_departamento :Joi.number().required()

    }
)

module.exports = {departamentoShema,empleadosShema}