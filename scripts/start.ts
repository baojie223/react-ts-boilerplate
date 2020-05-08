import webpack, { Compiler, Stats } from 'webpack';
import webpackDevMiddleware, { Options } from 'webpack-dev-middleware';
import webpackHotMiddleware, { MiddlewareOptions } from 'webpack-hot-middleware';
import devConfig from './configs/webpack.dev';
import express, { Express } from 'express';
import { argv } from 'yargs';
import open from 'open';
import cors from 'cors';
import history from 'connect-history-api-fallback';

const openBrowser = (compiler: Compiler, address: string) => {
  if (argv.open) {
    let hasOpend = false;
    compiler.hooks.done.tap('open', async (stats) => {
      if (!hasOpend && !stats.hasErrors()) {
        await open(address);
        hasOpend = true;
      }
    });
  }
};

const setupMiddlewares = (compiler: Compiler, server: Express) => {
  server.use(cors());
  server.use(history());

  const devMiddlewareOptions: Options = {
    publicPath: devConfig.output?.publicPath!,
    stats: 'minimal'
  };
  server.use(webpackDevMiddleware(compiler, devMiddlewareOptions));
};

const app = express();
const compiler = webpack(devConfig);

app.listen(3000, () => console.log('dev server is running at port 3000'));
