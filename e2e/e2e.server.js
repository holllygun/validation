const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config.js");

const options = {
  host: "localhost",
  port: 9000,
};

const compiler = webpack(config);
const server = new WebpackDevServer(options, compiler);

server
  .start()
  .then(() => {
    if (process.send) {
      process.send("ok");
    }
  })
  .catch((err) => {
    console.error("Error while starting the server", err);
  });
