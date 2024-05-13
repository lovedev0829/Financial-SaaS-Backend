import express from 'express';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';

import { sendResponse } from '../utils/response.utils';

const router = express.Router();

router.get('/', (req, res) => sendResponse(res, 200, `API is running`));
router.use('/api/auth', authRoutes);
router.use('/api/upload', uploadRoutes);

export default router;
