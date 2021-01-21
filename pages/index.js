import React from 'react'

export default function index() {
	return (
		<div className='container'>
			<h1>Welcome To My App</h1>
			<button className='btn btn-success'>Join</button>
			<div class="content-block post-list-view axil-control mt--30">
				<div class="post-thumbnail">
					<a href="post-details.html">
						<img src="https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg" alt="Post Images" />
                                </a>
                            </div>
					<div class="post-content">
						<div class="post-cat">
							<div class="post-cat-list">
								<a class="hover-flip-item-wrapper" href="#">
									<span class="hover-flip-item">
										<span data-text="FOOD">FOOD</span>
									</span>
								</a>
							</div>
						</div>
						<h4 class="title"><a href="post-details.html">Security isn’t just a technology problem
                                        it’s about design, too </a></h4>
						<div class="post-meta-wrapper">
							<div class="post-meta">
								<div class="content">
									<h6 class="post-author-name">
										<a class="hover-flip-item-wrapper" href="author.html">
											<span class="hover-flip-item">
												<span data-text="Jane Ara">Jane Ara</span>
											</span>
										</a>
									</h6>
									<ul class="post-meta-list">
										<li>Feb 17, 2019</li>
										<li>3 min read</li>
									</ul>
								</div>
							</div>
							<ul class="social-share-transparent justify-content-end">
								<li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
								<li><a href="#"><i class="fab fa-instagram"></i></a></li>
								<li><a href="#"><i class="fab fa-twitter"></i></a></li>
								<li><a href="#"><i class="fas fa-link"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
		</div>
	)
}
