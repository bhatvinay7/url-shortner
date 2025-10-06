import express, { Router } from 'express';
const router:Router=express.Router()
import callbackHandler  from './authCallback';
import googleauth  from './googleauth.js';
router.get('/auth/google',googleauth) 
router.get('/auth/google/callback',callbackHandler)
export default router
