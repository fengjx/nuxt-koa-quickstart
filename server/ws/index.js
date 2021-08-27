function init (io) {
  console.info('websocket init')
  io.on('connection', (socket) => {
    console.info('socket connect')
  })
}

export default init
