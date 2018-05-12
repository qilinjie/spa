import Util from './util'

// FilterChian 过滤器
export class FilterChain {
  constructor() {
    this._chain = []
  }
  addFilter(filter) {
    this._chain.push(
      filter.doFilter.bind(filter)
    )
    this.init()
  }
  init() {
    this._filter = Util.composeMiddlewares(this._chain) || Util.noop
    return this
  }
  middleware() {
    this.init()
    return (ctx, next) => {
      this._filter(ctx)
      return next && next(ctx)
    }
  }
}

export class Filter {
  doFilter(ctx, nextFilter) {
    return nextFilter && nextFilter(ctx)
  }
}
