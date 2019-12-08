const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  let production = argv.mode === 'production'
  return {
    entry: {      
      'index': path.resolve(__dirname, 'src/index.js')
    },

    output: {
      filename: '[name].js',
      path: path.resolve('../assets/js/'),
      chunkFilename:'[name].js'
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: '../../views/view-root.php',
        path: path.resolve('../views/'),
        template: __dirname + '/public/index.html',
        inject: 'true',
        chunks: ['webpackAssets'],
        // chunksSortMode: 'dependency'
    }),
      new DynamicCdnWebpackPlugin()
    ],
    
    devtool: production ? '' : 'source-map',
  
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
  
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
              "@babel/preset-react",
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: "> 2%"
                  }
                }
              ]
            ],
            plugins: ["@babel/proposal-class-properties"]
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader','sass-loader',],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: "file-loader?name=/public/icons/[name].[ext]"
        }
      ],
    },
  };
}
