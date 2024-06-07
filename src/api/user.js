import request from '@/utils/request'

// 注册接口
export const userRegisterService = (data) => {
  return request({
    method: 'POST',
    url: '/api/reg',
    data
  })
}
// export const userRegisterService = ({ username, password, repassword }) =>
//   request.post('/api/reg', { username, password, repassword })
// 登录功能
export const userLoginService = (data) => {
  return request({
    method: 'POST',
    url: '/api/login',
    data
  })
}

// 获取用户的基本信息
export const userGetInfo = () => {
  return request({
    method: 'GET',
    url: '/my/userinfo'
  })
}
