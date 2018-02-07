import { Controller } from 'egg'
import { Get, Routes, Middleware, createDecorator } from '../egg-decorators'

const Custom = createDecorator(async (ctx, next) => {
  ctx.body.custom = true
  return next()
})

@Routes
@Middleware(async (ctx, next) => {
  ctx.body = {}
  await next()
  ctx.body.global = true
})
export default class MiddlewaresController extends Controller {
  @Get('/middlewares/global')
  async globalMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/local')
  @Middleware(async (ctx, next) => {
    ctx.body.local = true
    return next()
  })
  async localMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/multi')
  @Middleware(async (ctx, next) => {
    ctx.body.local = true
    return next()
  })
  @Middleware(async (ctx, next) => {
    await next()
    ctx.body.multi = true
  })
  async multiMiddleware () {
    this.ctx.body.handler = true
  }

  @Get('/middlewares/custom')
  @Middleware(async (ctx, next) => {
    ctx.body.local = true
    return next()
  })
  @Custom
  @Middleware(async (ctx, next) => {
    await next()
    ctx.body.multi = true
  })
  async customMiddleware () {
    this.ctx.body.handler = true
  }
}
