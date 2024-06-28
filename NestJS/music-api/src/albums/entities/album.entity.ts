import { Artist } from 'src/artists/entities/artist.entity';
import { Song } from 'src/songs/entities/song.entity';
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
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  artistId: number;

  @Column()
  year: string;

  @Column()
  numberOfSales: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @ManyToMany(() => Song, (song) => song.albums)
  @JoinTable()
  songs: Song[];
}
