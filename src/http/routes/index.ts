import { Router } from 'express';
import vehicleRouter from './vehicle.routes';

const router = Router();

router.use('/vehicles', vehicleRouter);

export default router;