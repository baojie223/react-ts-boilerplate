import { Configuration } from 'webpack';

const commonConfig: Configuration = {
  entry: '',
  output: {
    publicPath: '/',
    path: '',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
    ],
  },
};

export default commonConfig;
