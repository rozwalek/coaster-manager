var path = require('path');

module.exports = {
    entry: './src/components/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
}