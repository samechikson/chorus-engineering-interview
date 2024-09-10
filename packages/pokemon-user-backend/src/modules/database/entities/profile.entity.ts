import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Pokemon)
  @JoinTable()
  pokemon: Pokemon[];
}
