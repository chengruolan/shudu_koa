const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const controller = require('./controller');
const cors = require('koa2-cors');

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add controllers:
app.use(controller());
app.use(bodyparser());
app.use(cors());

app.listen(3001);
console.log('http://localhost:3001')