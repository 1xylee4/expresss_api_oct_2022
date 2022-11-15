//import the express package as expressRef
let expressRef = require ('express')
const { default: mongoose } = require('mongoose')
let gmModel = require ("./goodmorning_model") 
let cors = require ("cors")
let PORT = 1234

// use expressRef to create express app
let app = expressRef()
app.use(expressRef.json())
app.use(cors())

//connect to mngodb in the cloud
let connectionString = "mongodb+srv://admin:140697@clusteryeah.dc2nofc.mongodb.net/thoughts"
mongoose.connect(connectionString)
let db = mongoose.connection

//check if database is connected from express code
db.once("open",()=>{
    console.log("Connected to mongodb database in the cloud!")
})

//create endpoint http://localhost:1234/ <- root end point
app.get("/",(request,response)=>{
    console.log("Reuqest received from: " + request.body)
    console.log("Base URL: " + request.baseUrl)
    //send the response to the client after encoding it in JSON format
    response.json({
        "message": "GET request received"
    })
})

//create endpoint http://localhost:1234/welcome <-/welcome end point
app.post("/",(request,response)=>{
    console.log("POST Request received from: ")
    console.log( request.body)
    console.log("Base URL: " + request.baseUrl)
    //send the response to the client after encoding it in JSON format
    response.json({
        "message": "POST request received"
    })
})

//create.endpoint http://localhost:1234/welcome <- /welcome end point
app.get("/welcome", (request,response)=>{
    console.log("GET request received from: ")
    console.log(request.url)
    //send the response to the client for encodeing it in JSON format
    response.json({
        "message":"Welcome to expresx app!"
    })
})

//get the list of quotes from mongodb database in cloud
//http://localhost1234/goodmorning/all
app.get("/goodmorning/all",(request,response)=>{
    console.log("Get all quotes from goodmorning collection.....")
    gmModel.find({},(error,data)=>{
        if (error) {
            response.json(error)
        }else{
            response.json(data)
        }
    })
})

//api to accept incoming requestbody
app.post("/goodmorning/add",(request,response)=>{
    console.log("POSt API request received....")
    console.log(request.body)

    let newGm = new gmModel()
    console.log("Log newGM (before intialization)")
    console.log(newGm)

    newGm.message = request.body.message
    newGm.author = request.body.author 
    newGm.like = request.body.like 
    console.log("Log newGM (after intialization");
    console.log (newGm)

   //save newGM to databse
   newGm.save((error) => {
        if(error){
            response.json(error)
        }else{
            response.json(newGm)
        }
    })
})

//expose the express app to PORT 1234
app.listen(PORT, ()=>{
    console.log("Listening to port: " + PORT)
})
