const express = require('express');
const app=express();
const dev=require('dotenv').config();
const morgan =require('morgan');
const departamento=require("./router/departamento")
const empleados=require("./router/empleado")
const swaggerUi=require('swagger-ui-express');
const swaggerJsDoc=require('swagger-jsdoc');
const cors=require('cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Documentation
const swaggerOptions = {
  definition: {
      openapi: '3.0.0',
      info: {
      title: 'API REST NETCO LTDA', 
      description: 'Esta es la documentación de la API en node js-postgres, creada como requisito del la prueba tecnica de desarrollador', 
      contact: {
          name: 'Wilmara Ruiz Diaz', 
          email: 'wilmara_andreina93@hotmail.com'
      }, 
      servers: ['http://localhost:1234'], 
      version: '1.0'
  }
}, 
apis: [`./src/docs/*.js`]

}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.set('port', process.env.PORT||8000)

//middewares es funciones que se ejecutan antes de 
app.use(express.json());

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
 })

 // Routes
 app.use('/api', departamento);
 app.use('/api', empleados);