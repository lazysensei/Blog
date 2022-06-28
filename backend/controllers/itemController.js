const asyncHandler = require('express-async-handler')

const Item = require('../model/itemModel')
// Get item
// GET api/item
const getItem = asyncHandler( async (req, res) =>{

    const items = await Item.find()
    res.status(200).json(items)
})

// Get item
// GET api/item
const getPostDetails = asyncHandler( async (req, res) =>{

    const items = await Item.find({"_id": req.params.id})
    res.status(200).json(items)
})

// Get  Uer item
// GET api/item/:id
const getUserItem = asyncHandler( async (req, res) =>{
    const items = await Item.find({user : req.params.id})
    res.status(200).json(items)
})

// POST item
// POST api/item
const setItem = asyncHandler( async (req, res)=>{

    if(!req.body.title || !req.body.description  || req.body.imag){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const items = await Item.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        likes: 0,
        image: req.body.image
    })

    res.status(200).json(items)
})

// Update item
// PUT api/item/:id
const updateItem = asyncHandler( async (req, res)=>{

    const items = await Item.findById(req.params.id)

    if(!items){
        res.status(400)
        throw new Error('Item not Found')
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.json(updatedItem)
})

// Delete item
// delete api/item/:id
const deleteItem = asyncHandler( async (req, res)=>{

    const items = await Item.findById(req.params.id)

    if(!items){
        res.status(400)
        throw new Error('Item not Found')
    }
    
    await items.remove()

    res.json({ id : req.params.id })
})

module.exports = {
    getItem,
    setItem,
    updateItem,
    deleteItem,
    getUserItem,
    getPostDetails
}