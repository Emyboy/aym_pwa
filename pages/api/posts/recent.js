import fire from '../../../FirebaseApp';

export default (req, res) => {
    const posts = [];
    fire.firestore().collection('posts').get()
        .then(data => {
            data.forEach(val => {
                posts.push(val.data())
            })
            res.send(posts)
        })
        .catch(err => {
            res.send(err)
        })
}

