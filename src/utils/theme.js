import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import axios from 'axios'

/*
* 把生成的样式表写到style
* */

export const writeNewStyle = elNewStyle => {
  // 创建style标签
  const style = document.createElement('style')
  // innerText 属性设置或返回指定节点及其所有子节点的文本内容。在这里是设置文本内容
  style.innerText = elNewStyle

  // html5中可通过document.head获取head元素
  // appendChild() 方法向节点添加最后一个子节点。
  document.head.appendChild(style)
}

/*
*根据主题色生成新的样式表
*
* */
export const generateNewStyle = async primaryColor => {
  // 根据主色生成色值表,generateColors函数需要编写
  const colors = generateColors(primaryColor)
  // 获取elemnet-plus的默认样式表，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // console.log(cssText)

  // 遍历生成的色值表，在默认样式表进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      // 全局替换  (:|\s+)空格   空格+ #FAD400
      // 说明：$1,$2上就是按顺序对应小括号里面的小正则 捕获到的内容。 str.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");
      new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
  })
  return cssText
}

export const generateColors = primary => {
  // 如果return后面什么都没有或者不写return，则返回undefined,且终止函数
  if (!primary) return
  // 默认primary
  const colors = { primary }
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary)
    // # 转换为16进制色值
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors
}

// 获取elemnet-plus的默认样式表
// require和import分别使用在:
// require 是赋值过程并且是运行时才执行，也就是异步加载。
// require可以理解为一个全局方法，因为它是一个方法所以意味着可以在任何地方执行。
// import 是解构过程并且是编译时执行。
// import必须写在文件的顶部
export const getOriginalStyle = async () => {
  // 导入element-plus/package.json
  const version = require('element-plus/package.json').version
  // 反引号常用字符串引用变量的时候
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

// 把需要进行替换的色值打上标记
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }

  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    // new RegExp()正则表达式,说白就是data中去找key。找到后用value替换
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
