module.exports = (env = {}) => {
    const isProduction = env.production === 'true';

    const path = require('path');
    const webpack = require('webpack');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const BabiliPlugin = require('babili-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    const config = {
        entry: {
            vendor: ['angular'],
            app: './src/app/comunarr-file-manager-client.module.js'
        },
        output: {
            filename: 'scripts/bundle.js',
            path: isProduction ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'src')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            query: {
                                presets: ['babili']
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.html$/,
                    use: [
                        { loader: 'html-loader' }
                    ]
                }
            ]
        },
        devtool: (() => {
            if (isProduction) {
                return 'hidden-source-map';
            }
            else {
                return 'eval-source-map';
            }
        })(),
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            compress: true,
            port: 4000
        },
        target: 'web',
        plugins: (() => {
            let plugins = [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    filename: 'scripts/vendor.js',
                    minChunks: Infinity
                }),
                new ExtractTextPlugin('css/styles.css')
            ];
            if (isProduction) {
                plugins.push(new HtmlWebpackPlugin({
                    title: 'Comunarr file manager client',
                    filename: 'index.html',
                    template: 'src/index.ejs',
                    cache: true,
                    showErrors: true
                }));
                plugins.push(new BabiliPlugin());
            }

            return plugins;
        })()
    };

    return config;
};