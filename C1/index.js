let express = require("express")

let app = express()

app.use(logger)

app.get("/books",(req,res)=>{
    return res.send({route:"/books"})
})

app.get("/libraries",check("librarian"),(req,res)=>{
    return res.send({route:"/libraries",permissions:req.permissions})
})

app.get("/authors",check("author"),(req,res)=>{
    return res.send({route:"/authors",permissions:req.permissions})
})


function logger(req,res,next){
   if(req.path=="/books"){
    req.permissions="books"
   }
   else if(req.path=="/libraries"){
    req.permissions=true
   }
   else if(req.path=="/authors"){
    req.permissions=true
   }
   else{
    req.permissions = "Somebody else"
   }
   next()
}

function check(fun){
   return function checkPermission(req,res,next){
     if(req.path=="/libraries"){
        next()
     }
     if(req.path=="/authors"){
        next()
     }
     else{
         req.role = "Not allowed"
     }
    }
    
}

app.listen(4000,()=>{
    console.log("check")
})