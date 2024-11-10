 const express = require('express')
 const bodyParser = require('body-parser')
 const morgan = require('morgan')
 const cors = require('cors')
 const pool = require('./config/db')
 const routes = require('./routes/routes')
 const app = express()
 const port = process.env.PORT || 3005

app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/api', routes)// /api

app.post("/api/test", (req, res) => {
  console.log("Request body:", req.body);
  res.json({ message: "Test route received", body: req.body });
});

app.listen(port,() =>{
    console.log(`server listening on ${port}`);
})


