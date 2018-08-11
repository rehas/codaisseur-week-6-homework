import { JsonController, Get, Body, Post, Put, Param, NotFoundError, BadRequestError, UnauthorizedError } from 'routing-controllers'
import Game from './entity'

type gamesArrayObject = {
  games : Game[]
}

type newGameName = {
  name: string
}

@JsonController()
export default class GamesController{

  @Get('/games')
   async getAllGames() : Promise<gamesArrayObject> {
    console.log("first call to the api")
    return {
      games: await Game.find()
    }
  }

  @Post('/games')
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
  async updateGame(
    @Param('id') id: number,
    @Body () inputObj
  ){
    const entity = await Game.findOne(id)
    // console.log("Input Object")
    // console.log(inputObj)
    const input = inputObj
    if(entity) {
      entity[Object.keys(input)[0]] = Object.values(input)[0]
      try {
        return entity.save()
      } catch (error) {
        console.log("Some error happened")
        console.error(error)
        // return error
      }
    }else{
      return NotFoundError
    }

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