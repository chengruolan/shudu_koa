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

app.use(bodyparser()); 

app.listen(3001);
console.log('http://localhost:3001')

// 解决跨域
app.use(cors({
  origin: function (ctx) {
      //return '*'  // 允许来自所有域名请求
      return 'http://localhost:8081'; // 这样就能只允许 http://localhost:8081 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(controller());