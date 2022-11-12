const { Pool }=require("pg");
const dev=require('dotenv').config();

console.log(process.env.PASS_DB)

 const pool = new Pool({
   // user:'postgres',
   // password:'12345',
   // host:'localhost',
   // port:5432,
   // database:'company'

    
    host:process.env.HOST_DB, 
    user:process.env.USER_DB, 
     password:process.env.PASS_DB, 
    database:process.env.DATABASE,
    port:5432,
    // max: 20, 
    // Número de milisegundos que un cliente debe permanecer inactivo en el pool y no ser comprobado
    // antes de ser desconectado del backend y descartado
    // por defecto es 10000 (10 segundos) - se ajusta a 0 para desactivar la desconexión automática de los clientes inactivos
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
})

module.exports = { pool }