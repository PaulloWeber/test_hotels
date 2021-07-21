import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity('hotels')
export class Hotel extends BaseEntity {
  @ObjectIdColumn()
  _id: string

  @Column({ unique: true })
  code: string

  @Column()
  name: string

  @Column()
  countryCode: string

  @Column()
  cityCode: string

  @Column()
  latitude: string

  @Column()
  longitude: string

  @Column()
  email: string

  @Column()
  address: string

  @Column()
  phone: string
}
