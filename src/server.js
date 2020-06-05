const express = require("express")
const server = express()



// public dir configuration
server.use(express.static("public"))

// ways configuration
// HOME
server.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html")
})
// CREATE POINT
server.get("/create-point", (request, response) => {
  response.sendFile(__dirname + "/views/create-point.html")
})
// SEARCH RESULTS
server.get("/search-results", (request, response) => {
  response.sendFile(__dirname + "/views/search-results.html")
})

// turn on the server
server.listen(3000)
