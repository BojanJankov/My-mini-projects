import { Player } from 'src/players/entities/player.entity';
import { Referee } from 'src/referees/entities/referee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  league: string;

  @Column()
  result: string;

  @ManyToMany(() => Player, (player) => player.matches)
  @JoinTable()
  players: Player[];

  @ManyToOne(() => Referee, (referee) => referee.matches)
  @JoinColumn()
  referee: Referee;
}
