const asyncHandler = require('express-async-handler')
const Comment = require('../model/commentModel')


// Get comment
// GET api/comment
const getComment = asyncHandler( async (req, res) =>{

    const comments = await Comment.find({item: req.params.id}).populate("user")
    res.status(200).json(comments)
    console.log(json(comments))
})


// POST comment
// POST api/comment
const setComment = asyncHandler( async (req, res)=>{

    if(!req.body.description){
        res.status(400)
        throw new Error('Please add a text field ')
    }

    Comment.create({
        description: req.body.description,
        likes: 0,
        item: req.body.id,
        user: req.user.id,
    },
    (err,comment)=>{
        if(err) return next(err)
        Comment.findById(comment._id).populate("user").exec((err, comment)=>{
            if(err) return next(err)
            res.status(200).json(comment)
        })
    })
})


// Update comment
// PUT api/comment/:id
const updateComment = asyncHandler( async (req, res)=>{

    const comments = await Comment.findById(req.params.id)

    if(!comments){
        res.status(400)
        throw new Error('Comment not Found')
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.json(updatedComment)
})


// Delete comment
// delete api/comment/:id
const deleteComment = asyncHandler( async (req, res)=>{

    const comments = await Comment.findById(req.params.id)

    if(!comments){
        res.status(400)
        throw new Error('Comment not Found')
    }
    
    await comments.remove()

    res.json({ id : req.params.id })
})

module.exports = {
    getComment,
    setComment,
    updateComment,
    deleteComment
}