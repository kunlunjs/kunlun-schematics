import Mock, { Random, mock } from 'mockjs'

// 手机号
Random.extend({
  phone: function () {
    const phonePrefix = ['1']
    return this.pick(phonePrefix)
  },
  // 性别
  gender: function () {
    return mock(/^(男|女|未知)$/)
  }
})

export { Random, mock }
export default Mock
