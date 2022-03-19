// import orderedJSON from 'json-order'

export const parseJSON = (jsonStr: string) => {
  if (!jsonStr) {
    return null
  }
  try {
    return JSON.parse(jsonStr)
    // return orderedJSON.parse(jsonStr).object
  } catch (error) {
    console.error(error)
    return null
  }
  // const trimedStr = jsonStr
  //   .replace(/^\s+|\s+$/gm, '')
  //   .replaceAll('\n', '')
  //   .replaceAll("'", '"')
  //   .trim()
  // console.log('trimedStr1', trimedStr)
  // // 非标准JSON，key不带""
  // if (jsonStr?.indexOf('":') < 0) {
  //   // const replacedJson = trimedStr
  //   //   .replaceAll('{', '{"')
  //   //   .replaceAll(':', '":')
  //   //   .replaceAll(',', ',"')

  //   const evalJson = eval('(' + trimedStr + ')')
  //   console.log('replacedJson', evalJson)
  //   return evalJson
  // } else {

  // }
}
