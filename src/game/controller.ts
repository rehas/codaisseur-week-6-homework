import { JsonController, Get, Body, Post, Put, Param, NotFoundError, BadRequestError, UnauthorizedError, HttpCode } from 'routing-controllers'
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
    console.log("first call to the api")
     return {
      games: (await Game.find()).sort((x,y)=>y.id-x.id)
    }
  }

  @Get('/games/:id')
  async getGameById(
    @Param('id') id:number
  ){
    return await Game.findOne(id)
  }

  @Post('/games')
  @HttpCode(201)
  async creteNewGame(
    @Body() newName : newGameName
  ){
    const entity = Game.create()
    entity.name = newName.name
    return entity.save()
    // const {name, ...rest} = newGame
    // console.log(name)
    // console.log(rest)
    //entity.color = ['red', 'blue', 'green', 'yellow', 'magenta'][Math.floor( Math.random() * 5)]
    // entity.board = JSON.parse('{}')
  }
  @Put('/games/:id')
  @HttpCode(206)
  async updateGame(
    @Param('id') id: number,
    @Body () input
  ){
    const {color, board, name} = input
    console.log(color, board, name)
    const entity = await Game.findOne(id)
    if(!entity) throw NotFoundError
    if (color) {
      if(colorSelection.includes(color)) {
        entity.color = color
      }else{
        throw new BadRequestError("Wrong color")
      }
    }
    if (name)  entity.name =  name
    if (board){
      console.log(moves(board, entity.board))
      if (moves(board, entity.board) === 1){
        entity.board = board
      } else if(moves(board, entity.board) >1){
        throw new BadRequestError("Too many moves at once")
      }else if(moves(board, entity.board) ===0 ){
        throw new BadRequestError("No change detected on board")
      }
    }
    return entity.save()

  }
}


//   @Get('/api/:userid/ads')
//   getAdsForUserId(
//     @Param('userid') userid: number
//   ) : number[] {
//     console.log(`Showing ads for ${userid}`)
//     return [userid, userid]
//   }

//   @Get('/api/ads/:adid')
//   async getAdsById(
//     @Param('adid') adid : number
//   ) : Promise<Advertisement | undefined> {
//     console.log(`showing ad number ${adid}`)
//     return await Advertisement.findOne(adid)
//   }

//   @Post('/api/ads')
//   async creteNewAd(
//     @Body() newAd :Advertisement
//   ){
//     return newAd.save()
//   }
// }