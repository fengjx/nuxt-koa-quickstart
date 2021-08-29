import { createServer } from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import { apiRouters } from './rest/api'
import { adminRouters } from './rest/admin'
import ws from './ws'

const app = new Koa()
app.use(bodyParser())
// log request URL:
app.use(async (ctx, next) => {
  console.info(
    `Protocol ${ctx.request.protocol} Process ${ctx.request.method} ${ctx.request.url}`
  )
  await next()
})

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

const httpServer = createServer(app.callback())
httpServer.on('upgrade', function upgrade (request, socket, head) {
  console.log(`Upgrade ${request.url}`)
  if (request.url !== '/ws') {
    console.warn('Invalid URL', request.url)
    socket.destroy()
  }
})
const port = process.env.PORT || 3001
httpServer.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${port}`)
})
ws.init(httpServer)

export default {
  path: '/web',
  handler: app
}
