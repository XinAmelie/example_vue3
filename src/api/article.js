// 获取所有的文章
import request from '@/utils/request'

export const getArticleList = data => {
  return request({
    url: '/article/list',
    params: data
  })
}

/**
 * 修改排序
 */
export const articleSort = data => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

/**
 * 创建文章
 */
export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

/**
 * 获取文章详情
 */
export const articleDetail = (articleId) => {
  // 默认是get请求
  return request({
    url: `/articleid/id=${articleId}`
  })
}

/**
 * 编辑文章详情
 */
export const articleEdit = (data) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
