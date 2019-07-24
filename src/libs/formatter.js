/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const formatterEditMode = (value) => {
  return value === 0 ? '不可编辑' : '可编辑'
}
