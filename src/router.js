import Rest from './rest'
import Util from './util'

// Router 把地址路由到 render
export class Router {
  constructor(config) {
    this._config = config
    this._rest = Rest(config)
  }
  middleware() {
    const router = (ctx, next) => {
      let hash = ctx.hash
      if (!hash) {
        hash = '/'
      }
      this.disposeAll()
      const rules = Object.keys(this._config)
      let refreshedFlag = false
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const render = this._config[rules[i]]
        if (rule === hash && !refreshedFlag) {
          render.refresh(ctx.RestParams)
          refreshedFlag = true
          break
        }
      }
      if (!refreshedFlag) {
        this._config['/'].refresh()
      }
      return next && next(ctx)
    }
    return Util.composeMiddlewares([this._rest, router])
  }
  disposeAll() {
    Object.keys(this._config).forEach((x) => this._config[x].dispose())
  }
}

export default function (config) {
  if (typeof config === 'undefined') {
    throw TypeError('config cannot be undefined')
  }
  return (new Router(config)).middleware()
}
