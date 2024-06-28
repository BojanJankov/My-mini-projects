import { Match } from 'src/matches/entities/matches.entity';
import { Team } from 'src/teams/entities/teams.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
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
  yearsOfPlayingCareer: number;

  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  @JoinColumn()
  team?: Team;

  @ManyToMany(() => Match, (match) => match.players)
  matches: Match[];
}
