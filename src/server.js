const express = require("express")
const server = express()
const db = require("./database/db")


// public folder configuration
server.use(express.static("public"))

// turn able the use of request.body in the application
server.use(express.urlencoded({ extended: true  }))

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
  // request.query: Query Strings da nossa url
  // console.log(request.query)

  return response.render("create-point.html")
})
// POST
server.post("/savepoint", (request, response) => {
  
  // request.body: O corpo do nosso formulário
  // 2 Insert data in table
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `

  const values = [
    request.body.image,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items
  ]

  function afterInsertData(err) {
    if(err) {
      console.log(err)
      return response.send("Erro no cadastro.")
    }

    console.log("Cadastrado com sucesso")
    console.log(this)
    return response.render("create-point.html", { saved: true  })
  }

  db.run(query, values, afterInsertData) // function passed by reference.


})


// SEARCH RESULTS
server.get("/search-results", (request, response) => {

  const search = request.query.search

  if(search == "") {
    // empty search
    return response.render("search-results.html", { tatal: 0 })
  }


  // take the date from db
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err) console.log(err)

    const total = rows.length

    return response.render("search-results.html", { places: rows, total })
  })

})

// turn on the server
server.listen(3000)
