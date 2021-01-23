import Router from '@koa/router'

const router = Router()

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users admin!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar admin'
})

export default router
