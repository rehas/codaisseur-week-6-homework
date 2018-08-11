import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON} from 'class-validator'
import { UnauthorizedError } from '../../node_modules/routing-controllers';

@Entity()
export default class Game extends BaseEntity {

  getColor() {
    return this.color
  }

  getColorOptions(){
    return ['red', 'blue', 'green', 'yellow', 'magenta']
  }

  getRandomColor(){
    return this.getColorOptions()[Math.floor( Math.random() * 5)]
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
    const newColor = this.getRandomColor() 
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
    if(!this.getColorOptions().includes(this.getColor())){
      throw new UnauthorizedError("color can only be " + this.getColorOptions())
    }  
  }
}
