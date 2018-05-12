import { Context } from '@/Context.js'

describe('Context', function () {
  describe('#start', function () {
    it('should redirected', function (done) {
      let ctx = new Context()
      ctx.redirect('index')
      expect(window.location.hash).to.equal('#index')
      done()
    })
  })
})
