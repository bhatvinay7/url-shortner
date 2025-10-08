import express, { Router } from 'express';
const router:Router=express.Router()
import callbackHandler  from '../controllers/authCallback.js';
import googleauth  from '../controllers/googleauth.js';
router.get('/auth/google',googleauth) 
router.get('/api/auth/callback/google',callbackHandler)
export default router