import type { UploadFile } from 'antd/lib/upload/interface'

export const onPreview = async (file: UploadFile) => {
  let src = file.url
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj!)
      reader.onload = () => resolve(reader.result as string)
    })
  }
  const image = new Image()
  image.src = src!
  const imgWindow = window.open(src)
  imgWindow?.document.write(image.outerHTML)
}
