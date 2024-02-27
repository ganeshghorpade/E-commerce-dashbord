const express = require('express');
const cors = require('cors');
const app = express();
const user = require('./database/user');
const product = require('./database/product');
const Jwt = require('jsonwebtoken')
const jwtKey = 'e-commerce';
require("./database/config")
app.use(express.json());
app.use(cors());

//Register API
app.post('/register',async(req,resp)=>{
    let data =  new user(req.body);
    let result = await data.save();
    //if we do not have password in resp 
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})


//Login API
app.post("/login", async(req,resp)=>{
if(req.body.password && req.body.email){
    let data = await user.findOne(req.body).select("-password");
    if(data){
        Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
            if(err){
                resp.send("Something went wrong")  
            }
            resp.send({user,auth:token})
        })
        //resp.send(data);
    }else{
        resp.send({result:"No user found"})
    }
}else{
    resp.send({result:"No user found"})
}
});

/* add Product API */

app.post('/addproduct', async(req,resp)=>{
 let data = new product(req.body);
 let result = await data.save();
 resp.send(result);
})


// product list API(get data)

app.get('/products',async(req,resp)=>{
let data = await product.find();

if(data.length>0){
    resp.send(data)
}else{
    resp.send("Product Not Found")
}

});

//Delete Api
app.delete('/delete/:id',async(req,resp)=>{
    //resp.send(req.params.id);
    const result = await product.deleteOne({_id:req.params.id})
    resp.send(result);
});


//get data for update

app.get("/product/:id",async(req,resp)=>{
    let result =await product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send("No Record Found")
    }
})


//update Api

app.put("/product/:id",async(req,resp)=>{
    let result = await product.updateOne(
       {_id:req.params.id},
        {$set:req.body}
    )
    if(result){
        resp.send(result)
    }else{
        resp.send("not found")
    }
})


//Search Api

app.get("/search/:key",async(req,resp)=>{
    let result = await product.find({
        "$or":[
            {
                name:{$regex:req.params.key}
            },
            {
                company:{$regex:req.params.key}
            }
        ]
    });
    if(result){
        resp.send(result);
    }else{
        resp.send("Product Not Found")
    }
})

app.listen(5000);   

