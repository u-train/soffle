const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// Just testing that the shared worked.
require("./shared/lol.js")

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const port = 3000

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// By default, it caches using the memory.
app.use("/",
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on given port.
app.listen(port, function () {
  console.log(`Running on http://localhost:${port}\n`);
});