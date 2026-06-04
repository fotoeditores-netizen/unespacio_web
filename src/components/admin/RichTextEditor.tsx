'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-200 rounded h-40 flex items-center justify-center text-gray-400 text-sm">
      Cargando editor...
    </div>
  ),
})

const TOOLBAR = [
  [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ header: [1, 2, 3, 4, false] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['link', 'blockquote', 'code-block'],
  ['clean'],
]

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const modules = useMemo(() => ({
    toolbar: TOOLBAR,
  }), [])

  return (
    <div className="rich-text-editor">
      <style>{`
        .rich-text-editor .ql-toolbar {
          border-color: #e5e7eb;
          border-radius: 6px 6px 0 0;
          background: #f9fafb;
          font-family: 'Montserrat', sans-serif;
        }
        .rich-text-editor .ql-container {
          border-color: #e5e7eb;
          border-radius: 0 0 6px 6px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          min-height: 160px;
        }
        .rich-text-editor .ql-editor {
          min-height: 160px;
          padding: 12px;
          line-height: 1.7;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        .rich-text-editor .ql-editor h1 { font-size: 2em; font-weight: 700; margin-bottom: 0.5em; }
        .rich-text-editor .ql-editor h2 { font-size: 1.5em; font-weight: 700; margin-bottom: 0.5em; }
        .rich-text-editor .ql-editor h3 { font-size: 1.25em; font-weight: 600; margin-bottom: 0.4em; }
        .rich-text-editor .ql-editor h4 { font-size: 1.1em; font-weight: 600; margin-bottom: 0.3em; }
        .rich-text-editor .ql-editor p { margin-bottom: 0.75em; }
        .rich-text-editor .ql-editor ul, .rich-text-editor .ql-editor ol { padding-left: 1.5em; margin-bottom: 0.75em; }
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-label::before,
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-item::before { content: 'Normal'; }
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before { content: 'Pequeño'; }
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before { content: 'Grande'; }
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
        .rich-text-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before { content: 'Muy grande'; }
        .rich-text-editor .ql-size-small { font-size: 0.85em; }
        .rich-text-editor .ql-size-large { font-size: 1.4em; }
        .rich-text-editor .ql-size-huge { font-size: 1.8em; }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder ?? 'Escribe aquí...'}
      />
    </div>
  )
}
