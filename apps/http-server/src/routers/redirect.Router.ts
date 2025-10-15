import express, { Router,RequestHandler} from 'express';
const router:Router=express.Router()
import redirect   from '../controllers/redirect.js';
router.post('/redirect',redirect) 
export default router