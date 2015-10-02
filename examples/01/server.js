import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const compiler = webpack({
  context: __dirname,
  entry: './app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

const server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/dist',
  hot: true,
});

server.listen(8080, 'localhost', () => {
  /* eslint no-console:0 */
  console.log('Dev server listening on port 8080');
});
