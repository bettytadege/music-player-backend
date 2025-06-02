const express=require('express')
const mostListenedController=require('../controller/mostListenedController')
const router=express.Router()
router.route('/')
.get(mostListenedController.getAllListenedSong)
// .post(mostListenedController.createMostListened)

router.route('/:id')
.get(mostListenedController.getOneListenedSong)
.put(mostListenedController.updateMostListened)
.delete(mostListenedController.deleteMostListened)

module.exports = router;