import { Match } from 'src/matches/entities/matches.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Referee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  salary: number;

  @Column()
  yearsOfExperience: number;

  @OneToMany(() => Match, (match) => match.referee)
  matches: Match[];
}
