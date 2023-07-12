/**
 * 获取所有用户列表数据
 */
import request from '@/utils/request'
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}
