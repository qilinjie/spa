// ctx 的命名空间
import Util from './util'

export class Resolver {
  // hash 变化监听器
  static listener() {
    return function (ctx, next) {
      const prevHash = Util.GlobalData('hash')
      Util.GlobalData('hash', ctx.hash)
      // 第一次 listen
      if (typeof prevHash === 'undefined') {
        return next && next(ctx)
      }
      if (ctx.hash === prevHash) {
        return ''
      }
      return next && next(ctx)
    }
  }
}

export default function () {
  return new Resolver()
}
