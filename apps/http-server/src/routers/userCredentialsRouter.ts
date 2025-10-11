import express, { Router } from 'express';
const router:Router=express.Router()
import getCredentials from '../controllers/getuserCredentials.js';

router.get('/api/getCredentials',getCredentials)
export default router