import express, { Router } from 'express';
const router:Router=express.Router()
import generateShortUrl  from '../controllers/shorten_url.controller.js';
router.post('/api/shorten_url',generateShortUrl) 
export default router