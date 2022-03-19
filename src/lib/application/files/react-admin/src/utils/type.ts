export const isUrl = (val: string) =>
  typeof val === 'string' && val.startsWith('http')

export const isImageUrl = (val: string) =>
  typeof val === 'string' &&
  val.startsWith('http') &&
  val.match(/\.(png|bmp|gif|webp|jpe?g)$/i)

export const isColorValue = (val: string) => {
  // const reg1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
  // const reg2 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
}
