// 将元素的left和top的px值和百分比值转化为纯数字

export const pxToNum = (px: string | number) => {
  if (typeof px === 'string') {
    return parseFloat(px)
  } else {
    return px
  }
}

// react组件返回一个div, 这个div是一个绝对定位元素, 他的props接受两个参数x和y, x和y代表div的style中的left和top属性, 可以传入数字或百分比或px值, 我希望在组件加载完成后将这个x和y转换为相对于父级定位元素纯数值并作为style的left和top值, 应该如何编写
