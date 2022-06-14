import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(path.resolve(), './dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
});
