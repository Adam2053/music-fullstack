import express from 'express';
import { play, streamAudio, uploadFile } from '../controllers/player.controller.js';
import upload from '../utils/multer.js';

const router = express.Router()

router.get('/play', play)
router.post('/upload', upload.any(), uploadFile)
router.get('/audio/:filename', streamAudio)

export default router;