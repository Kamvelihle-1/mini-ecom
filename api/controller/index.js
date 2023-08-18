const express = require('express')
const bodyParser = require('body-parser')
const {verifyToken} = require('../middleware/AuthonticateUser')
const routes = express.Router()
//import all model's objects
const {users,products} = require('../model')

//=====Routes for users=====
routes.get('/users',(req,res)=>{
    users.getUsers(req,res)
})
routes.get('/user/:id',(req,res)=>{
    users.getUser(req,res)
})
routes.post('/register',bodyParser.json(),(req,res)=>{
    users.register(req,res)
})
routes.patch('/user/:id',bodyParser.json(),(req,res)=>{
    users.updateUser(req,res)
})
routes.delete('/user/:id',(req,res)=>{
    users.deleteUser(req,res)
})
routes.post('/login',
bodyParser.json(), (req, res)=>{
    users.login(req, res)
})

//====Routes for products=====
routes.get('/products',(req,res)=>{
    products.getProducts(req,res)
})
routes.get('/product/:id',(req,res)=>{
    products.getProduct(req,res)
})
routes.patch('/product/:id',bodyParser.json(),(req,res)=>{
    products.updateProduct(req,res)
})
routes.delete('/product/:id',(req,res)=>{
    products.deleteProduct(req,res)
})
routes.post('/addProduct',bodyParser.json(),(req,res)=>{
    products.addProduct(req,res)
})

module.exports ={
    express,
    routes
}