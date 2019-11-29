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
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(svg|png|ttf)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    output: {
        filename: "app.js"
    },
    devServer: {
        contentBase: "./dist"
    }
};