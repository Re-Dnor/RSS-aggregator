import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => ({
  devtool: 'eval-source-map',
  mode: 'development',
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    shared: ['axios', 'bootstrap', 'i18next', 'on-change', 'yup'],
  },
  output: {
    path: path.join(path.resolve(), './dist'),
    filename: '[name].bundle.js',
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
