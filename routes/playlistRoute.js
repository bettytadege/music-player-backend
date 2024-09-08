const express=require('express')
const playlistController=require('../controller/playlistController')
const router=express.Router()
router.route('/')
.get(playlistController.getAllPlaylist)
.post(playlistController.createPlaylist)

router.route('/:id')
.get(playlistController.getOnePlaylist)
.put(playlistController.updatePlaylist)
.delete(playlistController.deletePlaylist)

module.exports = router;