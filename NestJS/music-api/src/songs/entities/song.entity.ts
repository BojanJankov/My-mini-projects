import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  year: string;

  @Column()
  genre: string;

  @ManyToOne(() => Artist, (artist) => artist.songs)
  @JoinColumn()
  artist: Artist;

  @ManyToMany(() => Album, (album) => album.songs)
  albums: Album[];
}
