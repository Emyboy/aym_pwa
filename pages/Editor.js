import React, { useState, useEffect, useRef } from 'react'
import Btn from '../components/Btn';
import TextInput from '../components/TextInput';
import DropdownSelect from '../components/DropdownSelect';
import fire from '../FirebaseApp';
import { withTheme } from '../context/AppContext';

export default withTheme((props) => {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [state, setState] = useState({
        html: null,
        title: null,
        loading: false,
        description: null,
        subCategories: [],
        category: null
    })

    const sendPost = () => {
        if (state.title && state.html) {
            setState({ loading: true })
            console.log(state)
            fire.firestore().collection('posts').get()
                .then(res => {
                    const number = res.size + 1;
                    const postData = {
                        html: state.html,
                        uid: props.context.auth.uid,
                        createdAt: new Date().toJSON(),
                        imageURL: null,
                        title: state.title,
                        views: 0,
                        id: uuid(),
                        number,
                        subCategories: state.subCategories,
                        category: state.category.id,
                        displayType: 'image',
                        type: 'html'
                    }
                    console.log('sending ---', postData);
                    fire.firestore().collection('posts').add(postData)
                        .then(res => {
                            console.log(res.id)
                            setState({ loading: false });
                            alert('Your article has been published')
                        })
                        .catch(err => {
                            setState({ loading: false })
                            console.log(err);
                        })
                })
                .catch(err => console.log(err))

        } else {
            alert('All Fields are required')
        }
    }

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
        }
        setEditorLoaded(true)
    }, [])

    const { context } = props;

    if(context.auth){
        return editorLoaded ? (
            <div className="container mt-4 pb-5" style={{ paddingBottom: '100vh' }}>
                <div classname='text-center'>
                    <h2>Create New Post</h2>
                </div>
                <TextInput
                    label='Title'
                    placeholder='Post Title'
                    onChange={e => setState({ ...state, title: e })}
                />
                <div className='row'>
                    <div className='mb-5 col-lg-6'>
                        <DropdownSelect
                            label='Main Category'
                            onChange={e => { setState({ ...state, category: e }) }}
                            options={context.categories}
                        />
                    </div>
                    <div className='mb-5 col-lg-6'>
                        <DropdownSelect
                            label='Sub Categories'
                            onChange={e => { setState({ ...state, subCategories: e }) }}
                            options={context.categories}
                            isMulti={true}
                        />
                    </div>
                </div>
                <CKEditor
                    editor={ClassicEditor}
                    // data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        setState({ ...state, html: data })
                    }}
                    onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                />
                <Btn
                    text='Publish'
                    onClick={sendPost}
                    className='mt-5'
                    loading={state.loading}
                />
            </div>
        ) : (
                <div>Editor loading</div>
            )
    }else {
        return <h6>Loading...</h6>
    }
});