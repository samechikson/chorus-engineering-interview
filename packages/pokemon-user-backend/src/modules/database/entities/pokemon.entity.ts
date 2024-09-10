import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  type1: string;

  @Column({ nullable: true })
  type2: string;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  speed: number;

  @Column({ type: 'text', nullable: true })
  spriteUrl: string;
}
