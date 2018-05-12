import Util from '@/util'
describe('Util', function () {
  describe('#start', function () {
    it('cookie set', function (done) {
      Util.cookie('key', 'val')
      expect(Util.cookie('key')).to.equal('val')
      Util.cookie('key', '')
      expect(Util.cookie('key')).to.equal('')
      done()
    })
  })
})
