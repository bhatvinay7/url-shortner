import express, { Router,RequestHandler} from 'express';
const router:Router=express.Router()
import generateShortUrl   from '../controllers/shorten_url.controller.js';
router.post('/shorten_url',generateShortUrl as any) 
export default router