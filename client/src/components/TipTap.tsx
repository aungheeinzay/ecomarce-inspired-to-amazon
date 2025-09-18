// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import { Button } from './ui/button'
import { Bold, Italic, List, ListOrdered } from 'lucide-react'
import { useEffect } from 'react'
interface tipTapProps {
  value: string
  onChange: (value: string) => void
}

const Tiptap = ({ value, onChange }: tipTapProps) => {
  console.log("description",value);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])
  if (!editor) return null

  return (
    <div>
      <div className="flex gap-2 p-5">
        <Button
          type="button"
          size={'sm'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive('bold') ? 'default' : 'outline'}
        >
          <Bold />
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive('italic') ? 'default' : 'outline'}
        >
          <Italic />
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        >
          <List />
        </Button>

        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
        >
          <ListOrdered />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose" />
    </div>
  )
}

export default Tiptap
