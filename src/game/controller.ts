import { JsonController, Get, Body, Post } from 'routing-controllers'
import Game from './entity'

type gamesArrayObject = {
  games : Game[]
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
    @Body() newGame : Game
  ){
    const {name, ...rest} = newGame
    console.log(name)
    console.log(rest)
    const entity = Game.create(rest)
    entity.name = name
    entity.color = ['red', 'blue', 'green', 'yellow', 'magenta'][Math.floor( Math.random() * 5)]
    entity.board = JSON.stringify([])
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