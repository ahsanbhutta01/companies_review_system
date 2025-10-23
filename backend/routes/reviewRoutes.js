import express from 'express'
import { getAllReviews,createReviews } from '../controllers/review.controller.js'


const router = express.Router()


router.get('/all', getAllReviews);
router.post('/create', createReviews)


export default router