import Mock from 'mockjs'
import user from './left.js'

Mock.mock('/main.php', 'get', () => {
  return user.page1
})