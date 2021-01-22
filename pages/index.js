import React, { useState, useEffect } from 'react'
import SubHeading from '../components/SubHeading'
import EachPost from '../components/EachPost';
import SidePanel from '../components/SidePanel'
import { withTheme } from '../context/AppContext';
import fire from '../FirebaseApp';
import Link from 'next/link'
import PostsLoading from '../components/PostsLoading';
import Global from '../Global';

const Home = (props => {
	const [posts, setPosts] = useState([])

	return (
		<div>
			<div className="axil-review-area post-listview-visible-color axil-section-gap bg-color-grey is-active">
				<div className="container">
					<SubHeading title='Recent Post' />
					<hr />
					<div className="row">
						<div className="col-lg-8 col-xl-8">
							{
								props.data.map((val, i) => <EachPost data={val} key={i} />)
							}
						</div>
						<SidePanel type='popular' />
					</div>
				</div>
			</div>
		</div>
	)
});

Home.getInitialProps = async (ctx) => {

	const res = await fetch(Global.API_URL + '/api/posts/recent')
	const json = await res.json()
	// console.log('JSON ---', json)
	return { data: json }
}

export default Home;

