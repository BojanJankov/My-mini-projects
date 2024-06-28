import { Manager } from 'src/managers/entities/manegers.entity';
import { Player } from 'src/players/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  league: string;

  @Column()
  year: number;

  @Column()
  valueOfTeam: number;

  @Column()
  trophies: number;

  @OneToOne(() => Manager, (manager) => manager.team)
  @JoinColumn()
  manager: Manager;

  @OneToMany(() => Player, (player) => player.team, { nullable: true })
  players: Player[];
}
