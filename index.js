const app = require('./src/app')
require('dotenv').config()
// console.log(process.env)
const port = process.env.PORT
app.listen(port, console.log("server started at port "+ port))