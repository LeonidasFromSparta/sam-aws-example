const Dotenv = require('dotenv-webpack')

module.exports = (env) => {

    const handlers = `${__dirname}/src/handlers`

    return {
        entry: {
            [env.handler.replace('.js', '')]: `${handlers}/${env.handler}`
        },
        output: {
            path: `${__dirname}/dist`,
            filename: '[name].js',
            library: { type: 'commonjs2' }
        },
        externals: env.NODE_ENV === 'local' ? ['pg-native'] : ['pg-native', 'aws-sdk'],
        devtool: env.NODE_ENV === 'local' ? 'eval-source-map' : 'source-map',
        mode: env.NODE_ENV === 'local' ? 'development' : 'production',
        target: 'node14',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', { targets: { node: '14' } }
                                ]
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new Dotenv({ path: env.NODE_ENV ? 'dev.env' : 'prod.env' })
        ]
    }
}
