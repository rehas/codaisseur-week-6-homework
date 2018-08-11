import { JsonController, Get, Body, Post, Put, Param, NotFoundError, BadRequestError, HttpCode } from 'routing-controllers'
import Game from './entity'

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

type gamesArrayObject = {
  games : Game[]
}

type newGameName = {
  name: string
}

const colorSelection = ['red','blue','green','yellow','magenta']

@JsonController()
export default class GamesController{

  @Get('/games')
   async getAllGames() : Promise<gamesArrayObject> {
     return {
      games: (await Game.find()).sort((x,y)=>y.id-x.id)
    }
  }

  @Get('/games/:id')
  async getGameById(
    @Param('id') id:number
  ) : Promise<Game | undefined> {
    const entity = await Game.findOne(id)
    if(!entity) throw new NotFoundError("No such game found check id")
    return entity
  }

  @Post('/games')
  @HttpCode(201)
  async creteNewGame(
    @Body() newName : newGameName
  ){
    const entity = Game.create()
    entity.name = newName.name
    return entity.save()
  }

  @Put('/games/:id')
  @HttpCode(206)
  async updateGame(
    @Param('id') id: number,
    @Body () input
  ){
    const {color, board, name} = input
    const entity = await Game.findOne(id)
    if(!entity) throw new NotFoundError("No such game found, check id")

    if (color) {
      if(colorSelection.includes(color)) {
        entity.color = color
      }else{
        throw new BadRequestError("Wrong color")
      }
    }

    if (name)  entity.name =  name

    if(board){
      if (board.length ===3 && board[0].length ===3 && board[1].length===3 && board[2].length ===3 ){
        const movesDiff = moves(board, entity.board)
        if (movesDiff === 1){
          entity.board = board
        } else if(movesDiff >1){
          throw new BadRequestError("Too many moves at once")
        }else if(movesDiff ===0 ){
          throw new BadRequestError("No change detected on board")
        }
      }else{
        throw new BadRequestError("Check board shape")
      }
    }
    return entity.save()
  }
}