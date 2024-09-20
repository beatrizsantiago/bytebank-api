const swaggerAutogen = require('swagger-autogen')()

const outputFile = './app/swagger_documentation.json';
const endpointsFiles = ['./app/routes/index.js'];

const options = {
  info: {
    title: 'Bytebank API',
    version: '1.0.0',
    description: 'FIAP tech challenge project API',
  },
};

swaggerAutogen(
  outputFile,
  endpointsFiles,
  options,
);
