const express=require('express')
const trackOfTheWeekController=require('../controller/trackOfTheWeekController')
const router=express.Router()
router.route('/')
.get(trackOfTheWeekController.getAllTrack)
.post(trackOfTheWeekController.createWeekTrack)

router.route('/:id')
.get(trackOfTheWeekController.getOneWeekTrack)
.put(trackOfTheWeekController.updateWeekTrack)
.delete(trackOfTheWeekController.deleteWeekOfTrack)

module.exports = router;