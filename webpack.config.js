const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
    mode: "none",
    target: "web",
    entry: path.join(__dirname, "src/index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist/"),
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /(\.module)?\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            },
                            sourceMap: true,
                        },
                    },
                    "sass-loader",
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
                exclude: /node_modules/
            },
        ],
    },
    plugins: [
        new DotEnv(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            inject: false,
        })
    ],
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: '/',
        },
    },
};
