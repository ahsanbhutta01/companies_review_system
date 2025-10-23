import express from 'express'
import { getAllCompanies,getAllCompaniesTotalStats,getSignleCompanyStats, getCompanyById } from '../controllers/company.controller.js'

const router = express.Router()


router.get('/all', getAllCompanies)
router.get('/total-stats', getAllCompaniesTotalStats)
router.get('/stats', getSignleCompanyStats)
router.get('/:id', getCompanyById)


export default router;