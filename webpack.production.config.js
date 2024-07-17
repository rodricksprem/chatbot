const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const flow = require('./package.json').flow;

module.exports = function(env) {
    const config = {
        entry: "./src/index.tsx",
        output: {
            filename: flow.filenames.js,
            path: path.resolve(__dirname, 'build')
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        mode: 'production',
        module: {
            rules: [
                { 
                    test: /\.tsx?$/, 
                    use: ["ts-loader"],
                },
                { 
                    test: /\.js$/, 
                    enforce: "pre", 
                    loader: "source-map-loader" 
                },
                { 
                    test:/\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                      ]
                },
                {
                    test: /\.png/,
                    use: [
                        {
                          loader: 'file-loader',
                          options: {
                            name: '[name].[ext]',
                          },
                        },]
                  },
                  
                
            ]
        },
        externals: {
            //"react": "React",
            //"react-dom": "ReactDOM"
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: flow.filenames.css }),
        ]
    }

    return config;
};