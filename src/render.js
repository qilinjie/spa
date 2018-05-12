// Render 将虚拟 dom 标签替换为 html 文本
export class Render {
  constructor (tagName, template, scripts) {
    this._tagName = tagName
    this._template = template
    this._dom = document.querySelector(tagName)
    this._scripts = scripts
    this._data = {}
  }
  // refresh 从数据刷新 html
  refresh (data) {
    this._data = {
      ...this._data,
      ...data
    }
    this._dom.innerHTML = this.doRender(this._data)
    return this._scripts && this._scripts()
  }
  // dispose 关闭渲染
  dispose () {
    this._dom.innerHTML = ''
  }
  // doRender 暂时不作数据绑定
  doRender () {
    return this._template
  }
}

export default function (tagName, template, scripts) {
  return new Render(tagName, template, scripts)
}
