// team.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Pokemon)
  @JoinTable()
  pokemon: Pokemon[];
}
