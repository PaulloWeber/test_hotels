export interface IBaseRepository<T> {
  findById(id: string): Promise<T>
  getAll(filters: T): Promise<T[]>
  add(data: T): Promise<T>
  update(id: string, data: T): Promise<T>
}
