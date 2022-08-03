const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkBoxWebpackPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            inject: "head",
            publicPath: "/",
            favicon: "src/assets/favicon.png"
        }),
    ];

    if (argv.mode !== "development") {
        plugins.push(
            new WorkBoxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/assets",
                        to: ".",
                    }
                ]
            }),
        );
    }

    return {
        target: "web",
        entry: path.join(__dirname, "src/index.tsx"),
        output: {
            filename: "bundle.js",
            path: path.join(__dirname, "dist"),
            clean: true,
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
                    test: /\.((c|sa|sc)ss)$/i,
                    oneOf: [
                        {
                            resourceQuery: /\.module/,
                            use: [
                                "style-loader",
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: {
                                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                        },
                                        sourceMap: (argv.mode === "development"),
                                    },
                                },
                                "sass-loader",
                            ],
                        },
                        {
                            use: [
                                "style-loader",
                                "css-loader",
                                "sass-loader",
                            ],
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: "asset",
                    exclude: /node_modules/
                },
            ],
        },
        plugins,
        devtool: (argv.mode === "development") ? "source-map" : false,
        devServer: {
            port: 3000,
            historyApiFallback: {
                index: '/',
            },
            proxy: {}
        },
    };
}