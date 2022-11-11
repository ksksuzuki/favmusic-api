const { setupServer } = require('./server')

const server = setupServer()
const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log('Server listening on Port', PORT)
})
