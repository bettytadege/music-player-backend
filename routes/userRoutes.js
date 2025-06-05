const express=require('express')
const userController=require('../controller/userController')
const authorization=require('../middleware/authorization')

const router=express.Router()

router.route('/').get(authorization.isAdmin,userController.getAllUser)
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/forget',userController.forgetPassword)
// router.post('/reset',userController.)

module.exports=router