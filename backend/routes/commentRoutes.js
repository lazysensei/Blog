const express = require('express')
const router = express.Router()
const {getComment,setComment,updateComment,deleteComment} = require('../controllers/commentController') 
const { protect } = require('../middleware/authMiddleware')

router.route('/id/:id').get(getComment).post(protect, setComment)
router.route('/id/:id').put(protect, updateComment).delete(protect, deleteComment)


module.exports = router