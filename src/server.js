const express = require("express")
const server = express()



// ways configuration
// HOME
server.get("/", (request, response) => {
  response.send("Cheguei ak")
})


// turn on the server
server.listen(3000)
