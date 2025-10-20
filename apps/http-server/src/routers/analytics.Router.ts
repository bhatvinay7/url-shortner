import express, { Router } from 'express';
const router:Router=express.Router()
import overallAnalytics from '../controllers/overallAnalytics.js';
import urlToppicAnalytics from '../controllers/url-topic-analytics.js';
import urlAnalytics from '../controllers/url-analytics.js';
import getUrls from '../controllers/getUrls.js'
router.get('/topic/:topic',urlToppicAnalytics)
router.get('/url/:urlId',urlAnalytics)
router.get('/overallAnalytics',overallAnalytics)
router.get('/getUrls',getUrls)

export default router