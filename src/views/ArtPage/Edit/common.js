// 处理提交事件；因为是makdown和editor共用的，所以就写一个公共的js就可以了
import { createArticle, articleEdit } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t

// 提交
export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

// 编辑文章的方法
export const editArticle = async data => {
  const res = await articleEdit(data)
  ElMessage.success('文章编辑成功')
  return res
}
