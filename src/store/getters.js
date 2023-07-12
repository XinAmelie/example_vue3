// 快捷访问;getters相当于第三属性。只有依赖值变化，才会去计算。variables中的值是死的。所以不计算。所以刷新页面，才能生效颜色变化
import variables from '@/styles/variables.module.css'
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {

  token: state => state.user.token,
  siderbarOpened: state => state.app.sidebarOpened,
  lanuage: state => state.app.language,
  mainColor: state => state.theme.mainColor,
  // generateColors()方法生成的色值，覆盖variables中的menuBg的值
  // 快捷访问需要指定的文件，所以这边把variables写在这里并解构一下(结不结构都可以。因为getters可以找到variables中的menuBg)。
  cssVar: state => ({ ...state.theme.variables, ...generateColors(getItem(MAIN_COLOR)) }),
  tagsViewList: state => state.app.tagsViewList
}

export default getters
