const path = require('path');

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [ "babel-loader" ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(svg|png|ttf)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: "app.js"
    },
    devServer: {
        contentBase: "./docs",
        host: "0.0.0.0"
    }
};