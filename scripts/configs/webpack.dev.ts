import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common';

const devConfig = webpackMerge(commonConfig, {
  mode: 'development',
});

export default devConfig;
