const path = require('path');
var WebpackNotifierPlugin = require("webpack-notifier");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const bundleFolder = "../wwwroot/dist/";
var HtmlWebpackPlugin = require('html-webpack-plugin');

clientConfig = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    target: 'web',
   // entry: './src/_index.jsx',
   entry: './src/index.js',
  devServer: {
    historyApiFallback: true,
  }
  ,
    plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' }), new WebpackNotifierPlugin()],//, new BrowserSyncPlugin()],
    module: {
        rules: [
            { test: /\.(png|svg|jpg|jpeg|gif|ico)$/, exclude: /node_modules/, use: ['file-loader?name=[name].[ext]'] },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }] }, 
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                        }
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, bundleFolder),
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:5001'
        })
    }
};

var serverConfig = {
    mode: 'development',
    target: 'node',
    // entry: './boot-server.js',
    // output: {
    //     libraryTarget: 'commonjs',
    //     path: path.resolve(__dirname, bundleFolder)//,
    //     // filename: 'bundle-server.js'
    // },
    module: {
        rules: [
            
            { test: /\.(png|svg|jpg|jpeg|gif|ico)$/, exclude: /node_modules/, use: ['file-loader?name=[name].[ext]'] },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            // { test: /\.css$/i, exclude: /node_modules/, use: ['style-loader', 'css-loader'] },
            // { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['react', ['env', { 'targets': { 'browsers': '> 5%' } }]] } }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.css']
    }
};


 module.exports = clientConfig;
 //module.exports = [clientConfig,serverConfig];





// module.exports = {
//     mode: 'development',
//     resolve: {
//         extensions: ['.js', '.jsx']
//     },
//     module: {
//         rules: [
//             { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['.js', '.jsx'],
//         alias: {
//             '@': path.resolve(__dirname, 'src/'),
//         }
//     },
//     plugins: [new HtmlWebpackPlugin({
//         template: './src/index.html'
//     })],
//     devServer: {
//         historyApiFallback: true
//     },
//     externals: {
//         // global app config object
//         config: JSON.stringify({
//             apiUrl: 'http://localhost:4000'
//         })
//     }
// }
















// var HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//     mode: 'development',
//     resolve: {
//         extensions: ['.js', '.jsx']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 loader: 'babel-loader'
//             }
//         ]
//     },
//     resolve: {
//         extensions: ['.js', '.jsx'],
//         alias: {
//             '@': path.resolve(__dirname, 'src/'),
//         }
//     },
//     plugins: [new HtmlWebpackPlugin({
//         template: './src/index.html'
//     })],
//     devServer: {
//         historyApiFallback: true
//     },
//     externals: {
//         // global app config object
//         config: JSON.stringify({
//             apiUrl: 'http://localhost:4000'
//         })
//     }
// }