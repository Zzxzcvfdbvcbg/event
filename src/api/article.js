import request from '@/utils/request'

// 获取文章分类
export const articleChannelService = () => {
  return request({
    method: 'GET',
    url: '/my/cate/list'
  })
}

// 增加文章
export const articleAddService = (data) => {
  return request({
    method: 'POST',
    url: 'my/cate/add',
    data
  })
}

// 更新文章分类
export const articleEditService = (data) => {
  return request({
    method: 'PUT',
    url: 'my/cate/info',
    data
  })
}
// 删除文章分类
export const articleDelService = (id) => {
  return request({
    method: 'DELETE',
    url: 'my/cate/del',
    params: { id }
  })
}
