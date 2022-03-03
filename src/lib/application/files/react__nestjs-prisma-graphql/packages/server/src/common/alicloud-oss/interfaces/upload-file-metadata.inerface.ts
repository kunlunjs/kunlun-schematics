export interface UploadedFileMetadata {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  buffer: Buffer
  url?: string
  bucket?: string
  customName?: string
  folder?: string
}
