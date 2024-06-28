import { Exclude } from 'class-transformer';
import { RolesEnum } from 'src/auth/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    enum: RolesEnum,
    type: 'enum',
    default: RolesEnum.user,
  })
  role: RolesEnum;

  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];
}
