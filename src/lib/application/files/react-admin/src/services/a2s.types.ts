/* eslint-disable */
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface RequestQuery {
  [key: string]: string | number | boolean | RequestQuery
}

export interface RequestBody {
  [key: string]: string | number | boolean | File | RequestBody
}

export interface RequestFunctionArgs {
  url: string
  method: Method
  query: RequestQuery
  body: RequestBody
  extraParams?: RequestBody
  done?: boolean
}

export type ResponseObject<T> = T
