/* 素材请求相关模块 */
import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 要求请求头中的 Content-Type 设置为 mutipart/form-data, 使用 axios 不需要手动设置, 只需给 data 一个 FormData 对象
    // new FormData()
    data
  })
}

// 获取素材列表
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
