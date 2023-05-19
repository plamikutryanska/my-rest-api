const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModel')

app.use(express.json())

//save data to Product database
app.post('/products', async (req, res) => {
  try{
    const products = await Product.create(req.body)
    res.status(200).json(products)
  } catch (error){
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

//get ALL data from database
app.get('/products', async(req,res) => {
  try{
    const products = await Product.find({})
    res.status(200).json(products)
  } catch {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

//get specific item from database
app.get('/products/:id', async(req,res) => {
  try{
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

//update a item in database
app.put('/products/:id', async (req,res) => {
  try{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    //we can not find product in database
    if(!product){
      return res.status(404).json({message: `can not find any product with id ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(product)
  } catch {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

//delete item from database
app.delete('/products/:id', async (req,res) => {
  try{
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id, req.body)
    //we can not find product in database
    if(!product){
      return res.status(404).json({message: `can not find any product with id ${id}`})
    }
    const deletedProduct = await Product.findById(id)
    res.status(200).json(product)
  } catch {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})


mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://plamenak:testPassword123@cluster0.u7nk50s.mongodb.net/My-Rest-Api?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to MongoDb')
  app.listen(3000, () => {
    console.log('Server has started on Port 3000')
  })
}).catch((e) => {
  console.log('error ===>', error)
})