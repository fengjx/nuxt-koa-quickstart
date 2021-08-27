import { createServer } from 'http'
import Koa from 'koa'
import mount from 'koa-mount'
import { Server } from 'socket.io'

import { apiRouters } from './rest/api'
import { adminRouters } from './rest/admin'
import wsInit from './ws'

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

const ws = new Koa()
app.use(mount('/ws', ws))

const httpServer = createServer(ws.callback())
const options = {}
wsInit(new Server(httpServer, options))

export default {
  path: '/web',
  handler: app
}
