import React from 'react';
import scss from './FooterPage.module.scss';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io';

const FooterPage = () => {
	return (
		<section className={scss.FooterPage}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.topBlock}>
						<div className={scss.title}>
							<div className={scss.nav}>
								<h3>Company</h3>
								<h4>About</h4>
								<h4>Jobs</h4>
								<h4>For the Record</h4>
							</div>
							<div className={scss.nav}>
								<h3>Communities</h3>
								<h4>For Artists</h4>
								<h4>Developers</h4>
								<h4>Advertising</h4>
								<h4>Investors</h4>
								<h4>Vendors</h4>
							</div>
							<div className={scss.nav}>
								<h3>Useful links</h3>
								<h4>Support</h4>
								<h4>Free Mobile App</h4>
							</div>
							<div className={scss.nav}>
								<h3>Spotify Plans</h3>
								<h4>Premium Individual</h4>
								<h4>Premium Duo</h4>
								<h4>Premium Family</h4>
								<h4>Premium Student</h4>
								<h4>Spotify Free</h4>
							</div>
						</div>

						<div className={scss.icons}>
							<div>
								{' '}
								<FaInstagram />
							</div>
							<div>
								<FaTwitter />
							</div>
							<div>
								<IoLogoFacebook />
							</div>
						</div>
					</div>
					<hr />
					<div className={scss.bottomBlock}>
						<div className={scss.leftText}>
							<h4>Legal</h4>
							<h4>Safety & Privacy Center</h4>
							<h4>Privacy Policy</h4>
							<h4>Cookies</h4>
							<h4>About Ads</h4>
							<h4>Accessibility</h4>
						</div>

						<div className={scss.right}>
							<h4>© 2024 Spotify AB</h4>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FooterPage;
