import React, { useState, useEffect, useRef } from 'react'
import Btn from '../components/Btn';
import TextInput from '../components/TextInput';
import DropdownSelect from '../components/DropdownSelect';
import fire from '../FirebaseApp';
import { withTheme } from '../context/AppContext';
import TextArea from '../components/TextArea';
import FileDnD from '../components/FileDnD';
import { Form } from 'react-bootstrap';
import { v4 as uid } from 'uuid';

export default withTheme((props) => {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {};
    const [imageFile, setImageFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [state, setState] = useState({
        html: null,
        title: null,
        loading: false,
        description: null,
        subCategories: [],
        category: null,
    })


    const uploadImage = async (id) => {
        setState({ ...state, loading: true })
        const allPosts = await fire.firestore().collection('posts').get();
        console.log('image data ---', imageFile)
        imageFile.map((val, i) => {
            console.log('val --', val);
            const uploadTask = fire.storage().ref().child(`images/posts/${props.context.auth.uid}-for-${allPosts.size + 1}/image_${i + 1}-for-${uid()}`).put(val)
            uploadTask.on('state_changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + Number.parseInt(progress) + '% done');
                setProgress(process)
            }, (error) => {
                // notification.error({ message: 'Error Uploading Image(s) ' });
                // dispatch({ type: LISTING_LOADING, payload: false });
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    sendPost(downloadURL);
                    return downloadURL
                    // ......... SEnd File Here
                }).catch(err => {
                    console.log('error ---', err);
                    return null
                });
            });
        })
    };


    const sendPost = async (imageURL) => {
        if (state.title && state.html) {
            console.log(state)
            console.log('IMAGE URL ---', imageURL)
            fire.firestore().collection('posts').get()
                .then(res => {
                    const number = res.size + 1;
                    const postData = {
                        html: state.html,
                        uid: props.context.auth.uid,
                        createdAt: new Date().toJSON(),
                        imageURL,
                        title: state.title,
                        views: 0,
                        id: uid(),
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

    if (context.auth) {
        return editorLoaded ? (
            <div className="container mt-4 pb-5" style={{ paddingBottom: '100vh' }}>
                <div classname='text-center'>
                    <h2>Create New Post</h2>
                </div>
                <TextInput
                    label='Title'
                    placeholder='Post Title'
                    disabled={state.loading}
                    onChange={e => setState({ ...state, title: e })}
                />
                <TextArea
                    label={'Description'}
                    placeholder={'Enter a short description'}
                    disabled={state.loading}
                    onChange={e => { setState({ ...state, description: e.target.value }) }}
                />
                <hr />
                <Form.Label>Image File:</Form.Label>
                <FileDnD
                    onChange={(e) => setImageFile(e)}
                />
                <hr />
                <div className='row'>
                    <div className='mb-5 col-lg-6'>
                        <DropdownSelect
                            label='Main Category'
                            disabled={state.loading}
                            onChange={e => { setState({ ...state, category: e }) }}
                            options={context.categories}
                        />
                    </div>
                    <div className='mb-5 col-lg-6'>
                        <DropdownSelect
                            disabled={state.loading}
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
                    onClick={uploadImage}
                    className='mt-5'
                    disabled={state.loading}
                    loading={state.loading}
                />
            </div>
        ) : (
                <div>Editor loading</div>
            )
    } else {
        return <h6>Loading...</h6>
    }
});