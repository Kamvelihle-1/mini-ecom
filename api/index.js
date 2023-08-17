const {express,routes} = require('./controller')
const app = express()
const path = require('path')
const cors = require('cors')
const errorHandler =require('./middleware/ErrorHandling')
const cookieParser = require('cookie-parser')
const port = +process.env.PORT || 3000

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Request-Methods","*");
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Expose-Headers","Authorization")

    next()
})
app.use(
    express.static('./static'),
    express.urlencoded({
        extended:false
    }),
    routes,
    cookieParser(),
    cors()
)
routes.get('^/$|/challenger',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./static/html/index.html'))
})

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})