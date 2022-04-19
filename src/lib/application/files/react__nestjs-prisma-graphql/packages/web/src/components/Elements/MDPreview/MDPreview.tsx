import createDOMPurify from 'dompurify'
import { marked } from 'marked'

const DOMPurify = createDOMPurify(window)

export type MDPreviewProps = {
  value: string
}

export const MDPreview = ({ value = '' }: MDPreviewProps) => {
  return (
    <div
      className="prose prose-indigo w-full p-2"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(value))
      }}
    />
  )
}
