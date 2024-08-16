import { Request, Response, Router } from 'express';
import { vehicleController } from '../factories/vehicle-controller.factory';
import { validateDtoMiddleware } from '../middlewares/validate-dto.middleware';
import { CreateVehicleDto } from '../dtos/vehicles/create-vehicle.dto';
import { ListVehiclesDto } from '../dtos/vehicles/list-vehicles-vehicles.dto';
import { UpdateVehicleDto } from '../dtos/vehicles/update-vehicle.dto';

const vehicleRouter = Router();

vehicleRouter.post('/', 
    validateDtoMiddleware(CreateVehicleDto),
    (req: Request, res: Response) => {
        return vehicleController.create(req, res);
    }
);

vehicleRouter.get('/', 
    validateDtoMiddleware(ListVehiclesDto),
    (req: Request, res: Response) => {
        return vehicleController.getAll(req, res);
    }
);

vehicleRouter.get('/:id', 
    (req: Request, res: Response) => {
        return vehicleController.findOneById(req, res);
    }
);

vehicleRouter.put('/:id', 
    validateDtoMiddleware(UpdateVehicleDto),
    (req: Request, res: Response) => {
        return vehicleController.update(req, res);
    }
);

vehicleRouter.delete('/:id', 
    (req: Request, res: Response) => {
        return vehicleController.delete(req, res);
    }
);

export default vehicleRouter;