const express =require("express");
const router = express.Router();
const { pool } = require ("../db/config");

const validator = require('express-joi-validation').createValidator({})
const {empleadosShema} = require("../schemas-joi/company")

router.get('/empleados',async(req,res)=>{
  let cliente = await pool.connect()
  try{
      let result =await cliente.query('SELECT * FROM empleados')
      res.json(result.rows)
  } catch(err) {
      console.log({ err })
      res.status(500).json({ error: 'Internal error server' })
}
})
  
router.get('/empleados/:codigo_empleados', async(req,res)=>{
  let cliente = await pool.connect()
  const { codigo_empleados } = req.params  
  try{
      let result =await cliente.query(`SELECT * FROM empleados WHERE codigo_empleados = $1`,
      [codigo_empleados])
     if(result.rows.length>0){
      res.json(result.rows)
     }else{
         res.send('NO EXISTE EMPLEADOS')
     }
  } catch(err) {
      console.log({ err })
      res.status(500).json({ error: 'Internal error server' })
}
})

router.post('/empleados',validator.body(empleadosShema),async(req,res)=>{
  try{
     
      const{
          nombre,
          apellido1,
          apellido2,
          direccion ,
          telefono,
          puesto,
          fk_departamento
        }= req.body
        const cliente=await pool.connect()
        const response=await cliente.query( `INSERT INTO empleados(nombre,apellido1,apellido2,direccion,telefono,puesto,fk_departamento)VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING codigo_empleados`,
        [
          nombre,
          apellido1,
          apellido2,
          direccion ,
          telefono,
          puesto,
          fk_departamento
      ])
      if (response.rowCount > 0) {res.send ('Se crea empleado correctamente')
    }
    else{  res.json({ message: 'No se pudo crear el usuario' })}
    }catch(err){console.log(err)
        res.status(500).json({ error: 'Internal error server' })
    }
 } )

 router.delete('/empleados/:codigo_empleados', async (req, res) => {
  let cliente = await pool.connect()
  const {codigo_empleados } = req.params
  console.log(codigo_empleados)
  try {
    const result= await cliente.query(
      `SELECT * FROM empleados WHERE codigo_empleados = $1`,
      [codigo_empleados]
    )
    if (result.rows.length > 0) {
      const result = await cliente.query(`DELETE FROM empleados WHERE codigo_empleados= $1`, [
          codigo_empleados
      ])
      if (result.rowCount > 0) res.send('Empleado eliminado exitosamente')
      else res.send('No se eliminó, ocurrió un evento inesperado')
    } else {
      res.status(409).json({ message: 'Error en dato en dato enviado' })
    }
  } catch (err) {
    if (err.code == 23503) {
      res
        .status(417)
        .json({ error: 'No se puede eliminar desde aquí este dato' })
    }
    res.status(500).json({ error: 'Error server' })
  } finally {
    cliente.release(true)
  }

})

router.put('/empleados/:codigo_empleados',validator.body(empleadosShema),async(req,res)=>{
  let cliente=await pool.connect()
  const{ codigo_empleados }=req.params
  const{ 
    nombre,
    apellido1,
    apellido2,
    direccion,
    telefono,
    puesto,
    fk_departamento  
  }= req.body

  
  try{
    const result=await cliente.query(`UPDATE empleados SET nombre =$1, apellido1=$2,apellido2=$3,direccion=$4,telefono=$5,puesto=$6,fk_departamento=$7 WHERE codigo_empleados = $8`,
    [
      nombre,
      apellido1,
      apellido2,
      direccion ,
      telefono,
      puesto,
      fk_departamento,
      codigo_empleados
  ])
if (result.rowCount > 0) {
    res.json({ message: 'Actualización realizada correctamente' })
  } else { res.status(503)
    .json({ message: 'Ocurrio un envento inesperado, intente de nuevo' })}
}
catch (err) {
console.log({ err })
res.status(500).json({ error: 'Internal error server' })
}
})


module.exports = router