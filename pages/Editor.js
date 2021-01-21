import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@material-ui/core'

export default function MyEditor() {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
    }, [])

    return editorLoaded ? (
        <div className='container'>
            <CKEditor
                editor={ClassicEditor}
                data='<p>Hello from CKEditor 5!</p>'
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor)
                }}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    console.log({ event, editor, data })
                }}
            />
            <Button variant='contained'>Click Me</Button>
        </div>
    ) : (
            <div>Editor loading</div>
        )
}