import React, { Component } from "react";
import fire, { googleProvider } from "../FirebaseApp";

export const AppContext = React.createContext({
    auth: null,
    authLoading: false,
});

export class AppContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.appendElementToPreview = this.appendElementToPreview.bind(this);
        this.openGoogleLogin = this.openGoogleLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.setContextState = this.setContextState.bind(this);
        this.getAllCategory = this.getAllCategory.bind(this);
        this.getRecentPost = this.getRecentPost.bind(this);
        this.getPopularPosts = this.getPopularPosts.bind(this);

        this.state = {
            auth: null,
            authLoading: false,
            previewData: [],
            list: [],
            categories: [],
            recentPosts: [],
            popularPosts: [],

            appendElementToPreview: this.appendElementToPreview,
            openGoogleLogin: this.openGoogleLogin,
            logout: this.logout,
            setContextState: this.setContextState,
            getAllCategory: this.getAllCategory,
            getrecentpost: this.getRecentPost,
            getPopularPosts: this.getPopularPosts
        };
    }

    async componentDidMount() {
        if (localStorage.getItem('auth')) {
            this.setState({
                auth: JSON.parse(localStorage.getItem('auth'))
            })
        }else if(localStorage.getItem('posts')){
            this.setState({
                recentPosts: JSON.parse(localStorage.getItem('posts'))
            })
        } else if (localStorage.getItem('cat')){
            this.setState({
                categories: JSON.parse(localStorage.getItem('cat'))
            })
        }
        if (localStorage.getItem('popular')) {
            this.setState({
                popularPosts: JSON.parse(localStorage.getItem('popular'))
            })
        }
        if (process.env.NODE_ENV === 'development') {
            console.log('context mounts', this.state);
        }


        this.setState({ previewData: [] })
        this.getRecentPost();
        this.getAllCategory();
        this.getPopularPosts();
    }

    getPopularPosts(){
        fire.firestore().collection('posts').limit(4).orderBy('views', 'desc').get()
            .then(res => {
                const arr = [];
                res.forEach(val => {
                    // console.log(val)
                    arr.push(val.data())
                });
                this.setState({
                    popularPosts: arr
                });
                localStorage.setItem('popular', JSON.stringify(arr))
            })
            .catch(err => {
                alert('Error Fetching Popular Posts')
            })
    }

    getRecentPost() {
        // console.log('GETTING POST...', process.env)
        fire.firestore().collection('posts').orderBy('number', "desc").limit(5).get()
            .then(res => {
                // console.log('res --', res.forEach(s => s))
                const all = [];
                res.forEach(val => {
                    // console.log(val)
                    all.push(val.data())
                });
                this.setState({
                    recentPosts: all,
                });
                localStorage.setItem('posts', JSON.stringify(all))
            })
            .catch(err => {
                // console.log(err)
                alert('Error Fetching data')
            })
    }

    setContextState(newstate) {
        this.setState(newstate)
    }

    getAllCategory() {
        const list = [];
        fire.firestore().collection('categories').get()
            .then(res => {
                res.forEach(item => {
                    list.push(item.data())
                });
                this.setState({
                    categories: list
                })
                // console.log('carts ---', list)
                localStorage.setItem('cat', JSON.stringify(list));
            })
            .catch(err => {
                alert('Error loading categories')
            })
    }

    appendElementToPreview(newElement) {
        // console.log('adding ---', newElement)
        this.setState({
            list: [...this.state.list, newElement]
        });
        // console.log('state', this.state)
    }

    logout() {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({
            auth: null,
        })
    };

    openGoogleLogin() {
        console.log('opening google')
        fire.auth().signInWithPopup(googleProvider)
            .then(result => {
                var token = result.credential.accessToken;
                var user = result.user;
                var userData = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    email: user.email,
                    title: null,
                    createdAt: new Date().toJSON(),
                    token,
                    verified: false,
                    isWriter: false,
                    instagram: null,
                    facebook: null,
                    twitter: null,
                    linkedin: null,
                    pintrest: null,
                    website: null,
                    bio: null,
                    categories: []
                };
                fire.firestore().collection('users').where('uid', '==', userData.uid)
                    .get().then(user => {
                        if (user.size > 0) {
                            user.forEach(val => {
                                this.setState({
                                    auth: val.data()
                                })
                            })
                        } else {
                            fire.firestore().collection('users').add(userData)
                                .then(res => {
                                    // console.log(res.id)
                                    if (res.id) {
                                        alert('logged in')
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    alert('error logging in')
                                })
                        }
                    })
                this.setState({
                    auth: userData
                });
                localStorage.setItem('auth', JSON.stringify(userData));
                // console.log(userData);
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorMessage)
                alert(error)
            });
        // })
    }


    render() {
        return (
            <AppContext.Provider
                value={{ ...this.state }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export function withTheme(Component) {
    // ...and returns another component...
    return function ThemedComponent(props) {
        // ... and renders the wrapped component with the context!
        // Notice that we pass through any additional props as well
        return (
            <AppContext.Consumer>
                {context => <Component {...props} context={context} />}
            </AppContext.Consumer>
        );
    };
}