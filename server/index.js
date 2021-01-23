import Koa from 'koa'
import mount from 'koa-mount'
import { apiRouters } from './rest/api'
import { adminRouters } from './rest/admin'

const app = new Koa()

const api = new Koa()
apiRouters.forEach((item, _) => {
  api.use(item.routes()).use(item.allowedMethods())
})
app.use(mount('/api', api))

const admin = new Koa()
adminRouters.forEach((item, _) => {
  admin.use(item.routes()).use(item.allowedMethods())
})
app.use(mount('/admin', admin))

export default {
  path: '/rest',
  handler: app.callback()
}
