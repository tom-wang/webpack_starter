const path = require('path');

module.exports = { 
    entry: './src/app.js',
    output: {
        filename: './dist/bundle.js'
    },  
    mode: 'development', //production | development
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.comm$/, 
                use: [
                    {
                        loader: 'comm-loader',
                        options: {
                            test: 'aaa'
                        }
                    }
                ]
            },
            {
                test: /\.sync$/, 
                use: [
                    {
                        loader: 'alias-sync-loader',
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.async$/, 
                use: [
                    {
                        loader: 'async-loader',
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.multi/,
                use: [
                    {
                        loader: 'second-loader',
                        options: {},
                    },
                    {
                        // 排在数组后面的loader先执行
                        loader: 'first-loader',
                        options: {},
                    }
                ]
            }
        ]
    },
    // 作用于模块的加载，比如import/require等场景
    // 先使用alias替换，再在modules里的目录中查找
    // resolve.modules
    // resolve.alias
    resolve: {
    },
    // 配置同resolve，用于loader的加载
    resolveLoader: {
        modules: [
            'node_modules',
            path.join(__dirname, '/loaders/')
        ],
        alias: {
            'alias-sync-loader': 'sync-loader'
        }
    }
}
