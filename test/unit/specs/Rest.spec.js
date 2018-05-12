import Rest from '@/rest.js'
import {Context} from '@/Context'
describe('Rest', function () {
  describe('#start', function () {
    it('parameters parsed', function (done) {
      let ctx = new Context()
      ctx.hash = '/login/3000'
      let rest = Rest({
        '/login/:uid': ''
      })
      rest(ctx)
      expect(ctx.RestParams.uid).to.equal('3000')
      expect(ctx.hash).to.equal('/login/:uid')
      done()
    })
  })
})
