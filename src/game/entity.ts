import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON} from 'class-validator'

@Entity()
export default class Game extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id : number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @Column('text', {nullable:true})
  color: string

  @IsJSON()
  @Column('json')
  board: JSON

  @BeforeInsert()
  setGame(){
    // Set color
    this.color = ['red', 'blue', 'green', 'yellow', 'magenta'][Math.floor( Math.random() * 5)]
    // Set board
    this.board = JSON.parse('[]')

  }
  
}
