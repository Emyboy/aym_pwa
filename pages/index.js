import React, { useState, useEffect } from 'react'
import SubHeading from '../components/SubHeading'
import EachPost from '../components/EachPost';
import SidePanel from '../components/SidePanel'
import { withTheme } from '../context/AppContext';
import fire from '../FirebaseApp';

import PostsLoading from '../components/PostsLoading';

export default withTheme(props => {
	const [posts, setPosts] = useState([])

	// useEffect(() => {
	//     fire.firestore().collection('posts').orderBy('number', "desc").limit(5).get()
	//         .then(res => {
	//             const all = [];
	//             res.forEach(val => all.push(val.data()));
	//             setPosts(all);
	//         })
	//         .catch(err => {
	//             console.log(err)
	//             alert('Error Fetching data')
	//         })
	// }, [])
	// console.log(props);
	const { context } = props;
	return (
		<div>
			<div className="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white is-active">
				<div className="container">
					<SubHeading title='Recent Post' />
					<hr />
					<div className="row">
						<div className="col-lg-8 col-xl-8">
							{/* <div className="axil-banner">
                <div className="thumbnail">
                <a href="#">
                <img className="w-100" src="https://cdn4.wpbeginner.com/wp-content/uploads/2018/07/whatisblog.png" alt="Banner Images" />
                </a>
                </div>
            </div> */}
							{
								context.recentPosts.length === 0 ?
									<PostsLoading /> :
									<>
										{
											context.recentPosts.map((val, i) => <EachPost
												key={i}
												data={val}
											/>)
										}
									</>
							}
						</div>
						<SidePanel type='popular' />
					</div>
				</div>
			</div>
		</div>
	)
});
