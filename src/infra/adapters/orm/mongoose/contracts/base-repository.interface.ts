export interface IRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findOneById(id: string): Promise<T | null>;
    getAll(filter?: Partial<T>, perPage?: number, sortOptions?: Partial<T>): Promise<T[]>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}