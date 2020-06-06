const express = require("express")
const server = express()



// public folder configuration
server.use(express.static("public"))



// using template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


// ways configuration
// HOME
server.get("/", (request, response) => {
  return response.render("index.html", { title: `Uau! que maravilha de nunjucks, baby!!!`})
})
// CREATE POINT
server.get("/create-point", (request, response) => {
  return response.render("create-point.html")
})
// SEARCH RESULTS
server.get("/search-results", (request, response) => {
  return response.render("search-results.html")
})

// turn on the server
server.listen(3000)
