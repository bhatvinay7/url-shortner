import express, { Router } from 'express';
const router:Router=express.Router()
import overallAnalytics from '../controllers/overallAnalytics.js';
import urlToppicAnalytics from '../controllers/url-topic-analytics.js';
import urlAnalytics from '../controllers/url-analytics.js';

router.get('/topic/:topic',urlToppicAnalytics)
router.get('/url/:urlId',urlAnalytics)
router.get('/overallAnalytics',overallAnalytics)
export default router