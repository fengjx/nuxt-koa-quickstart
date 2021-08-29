const ws = require('ws')
const WebSocketServer = ws.Server
const Cookies = require('cookies')

let wss
const wsApp = {}

function sessionParser (req) {
  if (!req) {
    return 'user1'
  }
  console.log('try parse: ', req)
  let s = ''
  if (typeof req === 'string') {
    s = req
  } else if (req.headers) {
    const cookies = new Cookies(req, null)
    s = cookies.get('name')
  }
  console.info(s)
  return {}
}

function createWebSocketServer (
  server,
  onConnection,
  onMessage,
  onClose,
  onError
) {
  wss = new WebSocketServer({
    server
  })

  wss.broadcast = function broadcast (data) {
    console.info('broadcast', data)
    wss.clients.forEach(function each (client) {
      client.send(data)
    })
  }
  onError =
    onError ||
    function (err) {
      console.log('[WebSocket] error: ', err)
    }
  wss.on('connection', function (ws) {
    ws.on('message', onMessage)
    ws.on('close', onClose)
    ws.on('error', onError)
    // check user:
    const user = sessionParser(ws.upgradeReq)
    if (!user) {
      console.warn('Unauthorized')
      ws.close(4001, 'Unauthorized')
      return
    }
    ws.user = user
    ws.wss = wss
    onConnection.apply(ws)
  })
  console.log('WebSocketServer was attached.')
  return wss
}

function onConnect () {
  console.info('client connect', this.user)
}

function onMessage (message) {
  console.log('client msg', message)
}

function onClose () {
  console.log('client close')
}

wsApp.init = (httpServer) => {
  createWebSocketServer(httpServer, onConnect, onMessage, onClose)
}

export default wsApp
