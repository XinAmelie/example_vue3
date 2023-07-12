import Mock from 'mockjs'

// querystring.parse()
import qs from 'qs'

// 基础配置
Mock.setup({
  // 延迟时间500-1000ms
  timeout: '500-1000'
})

// 获取web接口的数据 http://120.27.146.185:8076/api/reports/?page_size=5&page_index=1
// 拦截接口
// 拦截1. 接口路径 需要匹配到它
// 2.请求方式
// 3.返回数据（函数中返回数据）或者直接返回数据
// 正则表达式中 / 内容 /   rurl是正则的url / /api/requests /   需要转义/\/api\/reports/
//! !!!!!好坑注意不要写错了api的路径

// 这边mock的是接口的数据

// Mock.mock(/\/api\/requests\//, 'get', { msg: '获取数据成功', result: [] })  直接返回

/*
*
*函数的形式
*
*
*
* */
// user-manage/all-list

Mock.mock(/\/user-manage\/all-list/, 'get', (config) => {
  console.log(config)
  // 随机数据单条或者多条
  const arr = []
  // @占位符

  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock({
      username: '@cname',
      'mobile|1': [17687276717, 13286881177, 13149339114],
      'role|1': ['设计师', '经理', '测试'],

      openTime: '@date("yyyy-yy-y MM-M-dd-d")'
    }))
  }
  return { msg: '获取数据成功', result: arr }
})

// 动态的mock数据  config默认传参数
// Mock.mock(/\/api\/requests\//, 'get', (config) => {
//   // console.log(config)
//   /*
//   * config的信息
//   * {
//     "url": "http://120.27.146.185:8076/api/requests/?pageindex=1&pagesize=5",
//     "type": "GET",
//     "body": null
//             }
//             *
//             * For example, the query string 'foo=bar&abc=xyz&abc=123' is parsed into:
//             * querystring.parse()
//             {
//               foo: 'bar',
//               abc: ['xyz', '123']
//             }
//
//             *
//             *
//             * */
//   const query_strings = config.url.split('?')[1]
//   const query_object = qs.parse(query_strings)
//   // console.log(query_object)
//
//   /*  1和5是字符串，需要转换
//   * pageindex: "1"
//     pagesize: "5"
//   *
//   * */
//
//   // 随机数据单条或者多条
//   const arr = []
//   const m_raint = Math.floor(Math.random() * 3) + 1 // 1 -- 4
//   // @占位符
//   for (let i = 0; i < (+query_object.pagesize - m_raint); i++) {
//     arr.push(Mock.mock({
//
//       id: '@id',
//       'name|1': ['外卖平台', '云服务器', '世界之窗口', '花花时间'],
//       name_r: '@ctitle(10,20)',
//       description: '@ctitlr(4,10)',
//       price: '@float(100,200,2,2', // 保留2位小数
//       image: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`,
//       executor: {
//         username: '@cname'
//       },
//       create_time: '@date("yyyy-yy-y MM-M-dd-d")',
//       update_time: '@date("yyyy-yy-y MM-M-dd-d")',
//       'desc|1': ['测试中', '测试完毕', '测试未开始'],
//       status: '待定'
//     }))
//   }
//   // +号的意思是   数值字符串转数值   ‘1’ ====> 1
//   const t_total = Math.floor(Math.random() * 5) + 5
//   return {
//     msg: 'success',
//     total: 20 * t_total,
//     pageSize: +query_object.pagesize,
//     pageindex: +query_object.pageindex,
//     retlist: arr
//   }
// })
//
// /*
// * var Mock = require('mockjs');
// var Random = Mock.Random;
// data = Mock.mock({
//     'tableData|10': [{
//         date: ()=>Random.date(),
//         name: ()=>Random.cname(),
//         address: ()=>Random.county(true)
//     }]
// });
// console.log(JSON.stringify(data, null, 4))

// 文章详情页 /article/list
Mock.mock(/\/article\/list/, 'get', (config) => {
  const querystrings = config.url.split('?')[1]
  const queryobject = qs.parse(querystrings)
  const arr = []
  // +号的意思是   数值字符串转数值   ‘1’ ====> 1
  for (let i = 0; i < (+queryobject.pagesize); i++) {
    arr.push(Mock.mock({
      id: '@id',
      ranking: '@increment()',
      title: '@ctitle(4,6)',
      desc: '@ctitle(4,10)',
      author: '@cname',
      publicDate: '@date("yyyy-MM-dd")'

    }))
  }
  const ttotal = Math.floor(Math.random() * 5) + 5
  return {
    msg: 'success',
    total: 10 * ttotal,
    // // +号的意思是   数值字符串转数值   ‘1’ ====> 1
    pageSize: +queryobject.pagesize,
    pageindex: +queryobject.pageindex,
    retlist: arr
  }
})

// /article/create
Mock.mock(/\/article\/create/, 'post', (config) => {
  console.log(config)

  // 随机数据单条或者多条
  const arr = []
  // @占位符

  for (let i = 0; i < 5; i++) {
    arr.push(Mock.mock({
      username: '@cname',
      'mobile|1': [17687276717, 13286881177, 13149339114],
      'role|1': ['设计师', '经理', '测试'],

      openTime: '@date("yyyy-yy-y MM-M-dd-d")'
    }))
  }
  return { msg: '获取数据成功', result: arr }
})

// 文章的内容页面
// /article/${articleId}

Mock.mock(/\/articleid/, 'get', (config) => {
  // console.log(config)

  const query_strings = config.url.split('/')[2]
  const query_object = qs.parse(query_strings)
  // console.log(query_object)
  // @占位符

  const result = (Mock.mock({
    id: '@id',
    title: '@ctitle(4,10)',
    author: '@cname',
    publicDate: '@date("yyyy-MM-dd")',
    content: '@cparagraph(50)'
  }))

  return { msg: 'sucess', result }
})

// 文章的编辑接口  /article/edit

Mock.mock(/\/article\/edit/, 'post', (config) => {
  // console.log(config)

  // const query_strings = config.url.split('/')[2]
  // const query_object = qs.parse(query_strings)

  // @占位符
  const result = (Mock.mock({
    title: '@ctitle(4,10)',
    author: '@cname',
    publicDate: '@date("yyyy-MM-dd")',
    content: '@cparagraph(50)'
  }))

  return { msg: 'sucess', code: 200, result }
})
