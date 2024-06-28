import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateCarInsurenceDto } from 'src/carinsurance/dtos/create-carinsurence.dto';
import { CarInsurance } from 'src/carinsurance/entities/car-insurance.entity';
import { Feature } from 'src/feature/entities/feature.entity';

import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  manufacturer: string;

  @Column()
  petrol: string;

  @ValidateNested()
  @Type(() => CreateCarInsurenceDto)
  @OneToOne(() => CarInsurance, (carInsurance) => carInsurance.car)
  carInsurance: CreateCarInsurenceDto;

  @ManyToMany(() => Feature, (feature) => feature.cars)
  features: Feature[];
}
