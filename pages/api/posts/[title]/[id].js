import fire from "../../../../FirebaseApp"


export default (req, res) => {
    const {
        query: { id, title },
    } = req
    
    console.log('QUERY ---- ', id, title)
    fire.firestore().collection('posts').where('id', '==', id).get()
    .then(data => {
        data.forEach(val => {
            console.log(data.size)
                res.send(val.data())
            })
        })
        .catch(err => {
            res.send(err)
        })

}