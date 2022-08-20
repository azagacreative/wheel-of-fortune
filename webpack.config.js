const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "production",
  entry: {
    core: [
      "./lib/phaserjs/phaser.min.js",
    ],
  },
  output: {
    filename: "[name].js",
  }
};