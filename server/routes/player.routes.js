import express from 'express';
import { play } from '../controllers/player.controller.js';

const router = express.Router()

router.get('/play', play)

export default router;