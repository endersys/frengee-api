import { NextFunction, Request, Response } from "express";
import { validate, ValidationError } from "class-validator";
import { HttpStatus } from "../../shared/enums/http-status.enum";

export function validateDtoMiddleware<T>(type: new () => T): any {
    return (req: Request, res: Response, next: NextFunction): void => {
        
        const dto = Object.assign(new type(), req.body);
        
        validate(dto).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const messages = errors.map(error => Object.values(error.constraints!));

                res.status(HttpStatus.BAD_REQUEST).json({ message: messages });
            } 
            else {
                req.body = dto;
                
                next();
            }
        });
    };
}