import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON} from 'class-validator'
import { UnauthorizedError } from '../../node_modules/routing-controllers';

// type colorSelection = 'red' | 'blue' | 'green' | 'yellow' | 'magenta'

@Entity()
export default class Game extends BaseEntity {

  getColor() {
    return this.color
  }
  
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
    const newColor = ['red', 'blue', 'green', 'yellow', 'magenta'][Math.floor( Math.random() * 5)] 
    this.color = newColor
    // Set board
    const defaultBoard = [
      ['o', 'o', 'o'],
      ['o', 'o', 'o'],
      ['o', 'o', 'o']
    ]
    this.board = JSON.parse( JSON.stringify( defaultBoard))
  }

  @BeforeUpdate()
  // check color
  updateValidations(){
    console.log("color")
    if(!['red', 'blue', 'green', 'yellow', 'magenta'].includes(this.getColor())){
      console.log("invalid color")
      throw new UnauthorizedError("color can only be 'red', 'blue', 'green', 'yellow', 'magenta'")
    }  
  }
}
