import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Btn from './Btn';
import fire from '../FirebaseApp';
import TextInput from './TextInput';
import { v4 as uuid } from 'uuid';
import DropdownSelect from './DropdownSelect';
import { withTheme } from '../context/AppContext';

export default withTheme(class Editor extends Component {
    state = {
        html: null,
        title: null,
        loading: false,
        subCategories: [],
        category: null
    }

    sendPost() {
        if (this.state.title && this.state.html) {
            this.setState({ loading: true })
            console.log(this.state)
            fire.firestore().collection('posts').get()
                .then(res => {
                    const number = res.size + 1;
                    const postData = {
                        html: this.state.html,
                        uid: this.props.context.auth.uid,
                        createdAt: new Date().toJSON(),
                        imageURL: null,
                        title: this.state.title,
                        views: 0,
                        id: uuid(),
                        number,
                        subCategories: this.state.subCategories,
                        category: this.state.category.id,
                        displayType: 'image',
                        type: 'html'
                    }
                    console.log('sending ---', postData);
                    fire.firestore().collection('posts').add(postData)
                        .then(res => {
                            console.log(res.id)
                            this.setState({ loading: false });
                            alert('Your article has been published')
                        })
                        .catch(err => {
                            this.setState({ loading: false })
                            console.log(err);
                        })
                })
                .catch(err => console.log(err))

        } else {
            alert('All Fields are required')
        }
    }

    render() {
        const { context } = this.props;
        return (
            <div className="container mt-4 pb-5" style={{ paddingBottom: '100vh' }}>
                <div classname='text-center'>
                    <h2>Create New Post</h2>
                </div>
                <TextInput
                    label='Title'
                    placeholder='Post Title'
                    onChange={e => this.setState({ title: e })}
                />
                <div className='row'>
                    <div className='mb-5 col-lg-6'>
                        <DropdownSelect
                            label='Main Category'
                            onChange={e => { this.setState({ category: e }) }}
                            options={context.categories}
                        />
                    </div>
                    <div className='mb-5 col-lg-6'>
                        <DropdownSelect 
                            label='Sub Categories'
                            onChange={e => { this.setState({ subCategories: e }) }}
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
                        this.setState({ html: data })
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
                    onClick={this.sendPost.bind(this)}
                    className='mt-5'
                    loading={this.state.loading}
                />
            </div>
        )
    }
});
