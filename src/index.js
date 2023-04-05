const express = require('express');
const app = express();

const product = require('./routes/product');
const cart = require('./routes/cart');

app.use('/', product);
app.use('/', cart);

// Code quality tool: SonarQube
sonar.projectKey=process.env.projectKey
sonar.projectName=process.env.projectName
sonar.projectVersion=process.env.projectVersion
sonar.sources=./
sonar.language="js"
sonar.javascript.file.suffixes=".js"
sonar.host.url=process.env.projectHostUrl
sonar.login=process.env.loginToken


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
