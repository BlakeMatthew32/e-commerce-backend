const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if(!error) {
    console.log('Server is running. Port: ' + PORT);
  } else {
    console.log('Error occured, server can\'t be started.', error);
  }
});