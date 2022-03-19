import type { TinyMCE } from '../src/toolkit/TinyEditor/tinymce'

declare interface Window {}

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

declare module 'antd-dayjs-webpack-plugin' {}

declare namespace mockjs {
  interface MockjsRandomKL {
    phone: string
    gender: '男' | '女' | '未知'
  }

  interface MockjsRandom extends MockjsRandomKL {}
}

declare global {
  interface Window {
    tinymce: TinyMCE
  }
}
