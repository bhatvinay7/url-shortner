import express, { Router } from 'express';
const router:Router=express.Router()
import callbackHandler  from './authCallback.js';
import googleauth  from './googleauth.js';
router.get('/auth/google',googleauth) 
router.get('/api/auth/callback/google',callbackHandler)
export default router