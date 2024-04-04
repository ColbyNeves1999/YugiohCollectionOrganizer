import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Card {

  @PrimaryGeneratedColumn('uuid')
  cardID: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  type: string;

  @Column({ default: null })
  konamiId: number;

}