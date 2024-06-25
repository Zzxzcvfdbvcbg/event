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

// 获取文章列表
export const articleGetListService = (params) => {
  return request({
    method: 'GET',
    url: 'my/article/list',
    params
  })
}

// 发布文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 获取文章详情
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

// 编辑文章
export const artEditService = (data) => request.put('my/article/info', data)

// 删除文章
export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
