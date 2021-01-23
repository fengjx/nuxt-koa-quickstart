import Router from '@koa/router'

const router = Router()

router.prefix('/order')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a order response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a order/bar response'
})

export default router
