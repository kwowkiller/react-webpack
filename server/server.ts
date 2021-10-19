require('ignore-styles');
import express from 'express';
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';
import {Home} from '../src/views/Home';

const app = express();
app.use('^/$', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const document = fs.readFileSync(path.resolve('./build/index.html')).toString();
  const html = renderToString(React.createElement(Home));
  return res.send(document.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(6666, function () {
  console.log('ssr server started');
});
