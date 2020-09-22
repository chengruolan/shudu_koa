var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
  const router = require('koa-simple-router')

var index = require('./routes/index');
var users = require('./routes/users');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(router (_ =>{
  _.get('/' , (ctx, next) => {
    ctx.body = 'hellow world';
  })

  _.post('/path' , (ctx, next) => {
    //ctx.body = 'hellow world';
  })

  _.all('/login' , (ctx, next) => {
    ctx.body = 'hellow world';
  })

}))

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000,()=>{
  console.log('服务已启动，在 http://localhost:3000/');
});

module.exports = app;
