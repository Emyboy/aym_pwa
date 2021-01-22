import React, { useState } from 'react'
import { withTheme } from '../context/AppContext';
import fire from '../FirebaseApp';
import Btn from './Btn';
import TextInput from './TextInput'
import { v4 as uid } from 'uuid'

export default withTheme(props => {
    const { context } = props;
    const [state, setState] = useState({
        category: null,
        loading: false,
        categories: [],
        listLoading: false
    });

    const addCategory = () => {
        if (state.category) {
            setState({
                ...state,
                loading: true
            })
            fire.firestore().collection('categories').where('label', '==', state.category).get()
                .then(res => {
                    if (res.size > 0) {
                        alert(state.category + ' Category already exists')
                        setState({
                            ...state,
                            loading: false
                        })
                    } else {
                        fire.firestore().collection('categories')
                            .add({ label: state.category, value: state.category.toLocaleLowerCase(), views: 0, image: null, icon: null, id: uid() })
                            .then(res => {
                                if (res.id) {
                                    res.get().then(item => {
                                        context.setContextState({
                                            categories: [...context.categories, item.data()]
                                        })
                                    })
                                    context.setContextState({
                                        categories: [...context.categories,]
                                    })
                                    alert('Added');
                                    setState({ ...state, category: '' })
                                }
                                setState({
                                    ...state,
                                    loading: false
                                })
                            })
                            .catch(err => {
                                setState({
                                    ...state,
                                    loading: false
                                })
                                alert('Error Add Category')
                            })
                    }
                })
        } else {
            alert('Please enter a category')
        }
    }

    return (
        <div>
            <hr />
            <TextInput
                label='Add A Category'
                defaultValue={state.category}
                value={state.category}
                placeholder='Eg: Film, Travel'
                onChange={e => setState({ ...state, category: e })}
                disabled={state.loading}
                name='category'
            />
            <Btn
                text='Add'
                onClick={addCategory}
                loading={state.loading}
            />
            <hr />
        </div>
    )
});
