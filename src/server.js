import express from 'express';
import { html } from 'lit';
import { render } from '@lit-labs/ssr/lib/render.js';
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';

const server = express();

server.use('/dist', express.static('dist'));

server.use((req, res, next) => {
  res.renderTemplate = (template) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const readableResult = new RenderResultReadable(render(template));
    readableResult.pipe(res);
  }
  next();
})

const myTemplate = html`
  <html>
    <head>
      <script src="/dist/bundle.js"></script>
    </head>
    <body>
      <h1>The list</h1>
      <!-- The custom element is not rendered -->
      <my-list .name=${'Bruce'} .items=${['Batman', 'Car', 'Money']}></my-list>
    </body>
  </html>
`;

server.get('/', (req, res) => {
  res.renderTemplate(myTemplate);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});