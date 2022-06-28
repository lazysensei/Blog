const express = require('express')
const router = express.Router()
const {getItem,setItem,updateItem,deleteItem,getUserItem,getPostDetails} = require('../controllers/itemController') 
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(getItem).post(protect, setItem)
router.route('/id/:id').put(protect, updateItem).delete(protect, deleteItem).get(getPostDetails)
router.get('/useritem/id/:id', protect, getUserItem)

module.exports = router