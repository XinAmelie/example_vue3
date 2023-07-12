// 此处不要导入 @/i18n 使用 i18n.global ，因为我们在 router 中 layout 不是按需加载，
// 所以会在 Guide 会在 I18n 初始化完成之前被直接调用。导致 i18n 为 undefined
const steps = i18n => {
  return [
    {
      element: '#guide-start',
      // 弹出框
      popover: {
        title: i18n.t('msg.guide.guideTitle'),
        description: i18n.t('msg.guide.guideDesc'),
        position: 'bottom-right'
      }
    }
  ]
}

export default steps
