import { Album } from 'src/albums/entities/album.entity';
import { Song } from 'src/songs/entities/song.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  stageName: string;

  @Column()
  age: number;

  @OneToMany(() => Song, (song) => song.artist, { onDelete: 'CASCADE' })
  songs: Song[];

  @OneToMany(() => Album, (album) => album.artist, { onDelete: 'CASCADE' })
  albums: Album[];
}
