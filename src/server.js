const express = require("express")
const server = express()
const db = require("./database/db")


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
  // take the date from db
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) console.log(err)

    const total = rows.length

    return response.render("search-results.html", { places: rows, total })
  })

})

// turn on the server
server.listen(3000)
