import {NAME_SPACE} from './ctx'
const HistoryLockKey = `${NAME_SPACE.HISTORY_CTX_KEY}.history.lock`

// 历史管理中间件
export class History {
  constructor(config) {
    this._config = config
    this._iframe = document.createElement('iframe')
    this._iframe.style.position = 'absolute'
    this._iframe.style.visibility = 'hidden'
    document.body.appendChild(this._iframe)
    this._iframe.src = 'about:blank'
    window[HistoryLockKey] = false
  }
  pushHistory(hash) {
    if (!hash || window[HistoryLockKey]) {
      window[HistoryLockKey] = false
      return
    }
    const doc = this._iframe.contentWindow.document
    doc.write(`
            <head>
                <script>
                    parent["${HistoryLockKey}"] = true;
                    parent.location.hash = '${hash}'
                </script>
            </head>
            <body></body>
        `)
    // 每次都重写 iframe
    doc.close()
    window[HistoryLockKey] = false
  }
  middleware() {
    return (ctx, next) => {
      if (!ctx.hash) {
        return next && next(ctx)
      }
      this.pushHistory(ctx.hash)
      return next && next(ctx)
    }
  }
}

export default function () {
  return (new History()).middleware()
}
