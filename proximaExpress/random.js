const axios = require('axios');
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
axios.post('http://localhost:11434/api/generate', {
  model: 'llama3',
  prompt: 'Test prompt'
})
.then(response => console.log(response.data))
.catch(error => console.error(error));

server.listen(3004, () => {
  console.log("listening on *:3000");
});