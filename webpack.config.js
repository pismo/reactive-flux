const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist/packages/browser`,
        filename: 'main.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                loader: 'babel-loader',
                exclude: [/node_modules/] 
            },
        ]
    },
    externals: {
        angular: 'angular',
        'rx-angular': 'rx-angular'
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({ mangle: false })
    ]
};
