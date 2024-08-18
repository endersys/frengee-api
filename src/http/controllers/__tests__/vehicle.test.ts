import request from 'supertest';
import app from '../../../app';
import { HttpStatus } from '../../../shared/enums/http-status.enum';
import { ObjectId } from 'mongodb';

describe('Vehicle Controller', () => {
    const apiUrl = '/api/vehicles';

    describe('GetAll', () => {
        it('should return a list of vehicles', async () => {
            const response = await request(app).get(apiUrl);

            expect(response.status).toBe(200);

            expect(response.body).toEqual([]);
        });

        it('should return only the number of vehicles specified by per_page', async () => {
            await request(app)
                .post(apiUrl)
                .send({ make: 'Toyota', model: 'Corolla', year: 2020, plate: 'MYJ-1414', color: 'Red' })
                .expect(201);

            await request(app)
                .post(apiUrl)
                .send({ make: 'Honda', model: 'Civic', year: 2021, plate: 'XYZ456', color: 'Blue' })
                .expect(201);

            const response = await request(app)
                .get(apiUrl)
                .query({ per_page: 1 })
                .expect(200);

            expect(response.body.length).toBe(1);
        });
    });

    describe('Create', () => {
        it('should create a new vehicle successfully', async () => {
            const vehicleData = {
                make: 'Toyota',
                model: 'Corolla',
                year: 2020,
                plate: 'MYJ-1414',
                color: 'Red',
            };

            const response = await request(app)
                .post(apiUrl)
                .send(vehicleData)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.status).toBe(201);
        });

        it('should fail to create a new vehicle with missing required fields', async () => {
            const vehicleData = {
                make: 'Toyota',
                model: 'Corolla',
                //year: '2024', Ano é obrigatório
                plate: 'MYJ-1414',
                color: 'Red',
            };

            const response = await request(app)
                .post(apiUrl)
                .send(vehicleData)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message[0]).toContain('O ano do veículo é obrigatório');
        });

        it('should fail to create a new vehicle with invalid data', async () => {
            const vehicleData = {
                make: 'Toyota',
                model: 'Corolla',
                year: '2024', // Ano deve ser um número
                plate: 'MYJ-1414',
                color: 'Red',
            };

            const response = await request(app)
                .post(apiUrl)
                .send(vehicleData)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message[0]).toContain('O ano do veículo deve ser um valor numérico.');
        });
    });

    describe('Find by ID', () => {
        it('should find a vehicle by ID successfully', async () => {
            let vehicleId: string;

            const vehicleData = {
                make: 'Toyota',
                model: 'Corolla',
                year: 2022,
                plate: 'ABC-1234',
                color: 'Red',
            };

            const { body } = await request(app)
                .post(apiUrl)
                .send(vehicleData)
                .expect(HttpStatus.CREATED);

            vehicleId = body._id;

            const response = await request(app)
                .get(`${apiUrl}/${vehicleId}`)
                .expect(HttpStatus.OK);

            expect(response.body).toHaveProperty('_id', vehicleId);
            expect(response.body.make).toBe('Toyota');
            expect(response.body.model).toBe('Corolla');
            expect(response.body.year).toBe(2022);
            expect(response.body.plate).toBe('ABC-1234');
            expect(response.body.color).toBe('Red');
        });

        it('should return a 404 error if the vehicle is not found', async () => {
            const nonExistentId = new ObjectId().toHexString();

            const response = await request(app)
                .get(`${apiUrl}/${nonExistentId}`)
                .expect(HttpStatus.NOT_FOUND);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('Veículo não encontrado!');
        });

        it('should return a 400 error if the ID format is invalid', async () => {
            const invalidId = 'id-inválido';

            const response = await request(app)
                .get(`${apiUrl}/${invalidId}`)
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('ID inválido');
        });
    });

    describe('Update', () => {
        it('should update a vehicle successfully', async () => {
            let vehicleId;

            const vehicleData = {
                make: 'Toyota',
                model: 'Corolla',
                year: 2022,
                plate: 'ABC-1234',
                color: 'Red',
            };

            const { body } = await request(app)
                .post(apiUrl)
                .send(vehicleData)
                .expect(HttpStatus.CREATED);

            vehicleId = body._id;

            const updatedData = {
                make: 'Honda',
                model: 'Civic',
                year: 2023,
                plate: 'XYZ-5678',
                color: 'Blue',
            };

            await request(app)
                .put(`${apiUrl}/${vehicleId}`)
                .send(updatedData)
                .expect(HttpStatus.NO_CONTENT);

            const response = await request(app)
                .get(`${apiUrl}/${vehicleId}`)
                .expect(HttpStatus.OK);

            expect(response.body.make).toBe('Honda');
            expect(response.body.model).toBe('Civic');
            expect(response.body.year).toBe(2023);
            expect(response.body.plate).toBe('XYZ-5678');
            expect(response.body.color).toBe('Blue');
        });

        it('should return a 404 error if the vehicle is not found', async () => {
            const nonExistentId = new ObjectId().toHexString();

            const updatedData = {
                make: 'Honda',
                model: 'Civic',
                year: 2023,
                plate: 'XYZ-5678',
                color: 'Blue',
            };

            const response = await request(app)
                .put(`${apiUrl}/${nonExistentId}`)
                .send(updatedData)
                .expect(HttpStatus.NOT_FOUND);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('Veículo não encontrado!');
        });

        it('should return a 400 error if the data is invalid', async () => {
            const vehicleId = new ObjectId().toHexString();

            const invalidData = {
                make: '',
                model: '',
                year: '2024',
                plate: '',
                color: '',
            };

            const response = await request(app)
                .put(`${apiUrl}/${vehicleId}`)
                .send(invalidData)
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message')
            expect(response.body.message[0]).toContain("O ano do veículo deve ser um valor numérico.");
        });

        it('should return a 400 error if the ID format is invalid', async () => {
            const invalidId = 'id-inválido';

            const updatedData = {
                make: 'Honda',
                model: 'Civic',
                year: 2023,
                plate: 'XYZ-5678',
                color: 'Blue',
            };

            const response = await request(app)
                .put(`${apiUrl}/${invalidId}`)
                .send(updatedData)
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message');

            expect(response.body.message).toContain('ID inválido');
        });
    });

    describe('Delete', () => {
        it('should delete a vehicle successfully', async () => {
            let vehicleId;

            const vehicleData = {
                make: 'Toyota',
                model: 'Corolla',
                year: 2022,
                plate: 'ABC-1234',
                color: 'Red',
            };

            const { body } = await request(app)
                .post(apiUrl)
                .send(vehicleData)
                .expect(HttpStatus.CREATED);

            vehicleId = body._id;

            await request(app)
                .delete(`${apiUrl}/${vehicleId}`)
                .expect(HttpStatus.NO_CONTENT);

            await request(app)
                .get(`${apiUrl}/${vehicleId}`)
                .expect(HttpStatus.NOT_FOUND);
        });

        it('should return a 404 error if the vehicle is not found', async () => {
            const nonExistentId = new ObjectId().toHexString();

            const response = await request(app)
                .delete(`${apiUrl}/${nonExistentId}`)
                .expect(HttpStatus.NOT_FOUND);

            expect(response.body).toHaveProperty('message');

            expect(response.body.message).toContain('Veículo não encontrado!');
        });

        it('should return a 400 error if the ID format is invalid', async () => {
            const invalidId = 'id-inválido';

            const response = await request(app)
                .delete(`${apiUrl}/${invalidId}`)
                .expect(HttpStatus.BAD_REQUEST);

            expect(response.body).toHaveProperty('message');

            expect(response.body.message).toContain('ID inválido');
        });
    });
});
