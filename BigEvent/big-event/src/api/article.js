import request from '@/utils/request';
import { useTokenStore } from '@/stores/token.js'
// 文章分类列表查询
export const articleCategoryListService = () => {
  // const tokenStore = useTokenStore()
  // return request.get('/category',{headers:{'Authorization':tokenStore.token}}) // 在pinia中的定义的响应式数据都不需要.value
  return request.get('/category')
}

// 文章分类添加接口
export const articleCategoryAddService = (categoryData) => {
  return request.post('/category', categoryData)
}

// 文章分类编辑接口
export const articleCategoryUpdateService = (categoryData) => {
  return request.put('/category', categoryData)
}

// 文章分类删除接口
export const articleCategoyDeleteService = (id) => {
  return request.delete('/category?id=' + id)
}

// 文章列表查询
export const articleListService = (params) => {
  return request.get('/article', { params: params })
}

// 文章添加接口
export const articleAddService = (articleData) => {
  return request.post('/article', articleData)
}

// 编辑文章接口
export const articleUpdateService = (articleData) => {
  return request.put('/article', articleData)
}

// 文章删除接口
export const articleDeleteService = (id) => {
  return request.delete('/article?id=' + id)
}