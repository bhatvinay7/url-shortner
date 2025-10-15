import express, { Router} from 'express';
const router:Router=express.Router()
import redirect   from '../controllers/redirect.js';
router.post('/redirect/:hash',redirect) 
export default router