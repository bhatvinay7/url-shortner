import express, { Router} from 'express';
const router:Router=express.Router()
import collectData   from '../controllers/collect-user-data.js';
router.post('/collectData/:hash',collectData) 
export default router