import { message } from 'antd'
import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { upload } from '@/services/a2s.adapter'
import type { Editor } from './tinymce'
// import { TinyMCE } from './tinymce'

const script = document.createElement('script')
script.src = '/tinymce/tinymce.min.js'
document.body.appendChild(script)

export interface TinyEditorProps {
  className?: string
  style?: CSSProperties
  value?: string
  onChange?: (value?: string) => void
}

const TinyEditor = ({ className, style, value, onChange }: TinyEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<Editor>()

  useEffect(() => {
    window.tinymce.init({
      target: containerRef.current!,
      // inline: true,
      language: 'zh_CN',
      plugins:
        'print preview autolink directionality fullscreen image link media code table charmap hr pagebreak nonbreaking anchor lists wordcount imagetools textpattern help emoticons autosave autoresize indent2em',
      toolbar: [
        'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link | alignleft aligncenter alignright alignjustify indent2em',
        'formatselect fontselect fontsizeselect lineheight | bullist numlist | blockquote subscript superscript removeformat',
        'table image media charmap emoticons hr pagebreak | print preview fullscreen'
      ],
      menubar: false,
      placeholder: '这里是富文本内容输入区域',
      toolbar_sticky: true,
      // 文件上传
      // 暂时只支持media，可选项'file image media'
      // file_picker_types: 'media',
      // 图片上传
      images_upload_handler: async function (
        blobInfo,
        successCallback,
        failureCallback
      ) {
        const { success, data, message } = await upload(
          new File([blobInfo.blob()], blobInfo.filename())
        )
        if (!success) {
          failureCallback(message)
        } else {
          successCallback(data!.url)
        }
      },
      // 文件上传
      file_picker_callback: async function (callback, value, meta) {
        const mediaTypes = {
          image: 'images/*',
          media: 'video/*',
          file: '*'
        }

        //模拟出一个input用于添加本地文件
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute(
          'accept',
          mediaTypes[meta.filetype as keyof typeof mediaTypes]
        )
        input.click()
        input.onchange = async function (e) {
          const file = (e.currentTarget as HTMLInputElement)?.files?.[0]
          if (file) {
            const resp = await upload(file)
            if (!resp.success) {
              message.error(resp.message)
            } else {
              // Provide file and text for the link dialog
              if (meta.filetype == 'file') {
                callback(resp.data!.url, { text: resp.data!.fileName })
              }
              // Provide image and alt text for the image dialog
              if (meta.filetype == 'image') {
                callback(resp.data!.url, { alt: resp.data!.fileName })
              }
              // Provide alternative source and posted for the media dialog
              if (meta.filetype == 'media') {
                callback(resp.data!.url)
              }
            }
          }
        }
      },
      // 字号
      fontsize_formats: '10px 12px 14px 16px 18px 24px 36px 48px 56px 72px',
      font_formats:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      // autoresize 提供
      max_height: 520,
      min_height: 400,
      init_instance_callback(editor) {
        editorRef.current = editor
        // 初始值
        if (value) {
          editor.setContent(value)
        }
        // 变化
        editor.on('change', () => {
          onChange?.(editor.getContent())
        })
      }
    })
    return () => {
      editorRef.current?.destroy()
    }
  }, [])

  return <div className={className} style={style} ref={containerRef} />
}

export default TinyEditor
