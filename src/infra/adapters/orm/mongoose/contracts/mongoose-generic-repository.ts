import { Model, FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IRepository } from './base-repository.interface';

export abstract class MongooseGenericRepository<T> implements IRepository<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const entity = new this.model(data);
        
        await entity.save();

        return entity;
    }

    async findOneById(id: string): Promise<T | null> {
        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        return await this.model.findOne({ _id: new ObjectId(id) }).lean();
    }

    async getAll(filter: FilterQuery<T> = {}, perPage?: number, sortOptions?: {}): Promise<T[]> {
        return await this.model.find(filter)
            .limit(perPage ?? 25)
            .sort(sortOptions)
            .lean();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        return await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id: string): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            throw new Error("ID inválido");
        }

        const result = await this.model.findByIdAndDelete(id);

        return result !== null;
    }
}
