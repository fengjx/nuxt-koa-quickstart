import user from './user'
import order from './order'

const Router = require('@koa/router')
const router = Router()

router.get('/', function (ctx, next) {
  ctx.body = 'Hello API'
})

const apiRouters = [router, user, order]

export { apiRouters }
