'use client';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import scss from './ProfileMenu.module.scss';
import { useHeaderStore } from '@/stores/useHeaderStore';

const ProfileMenu = () => {
	const { isOpenProfileMenu, logout } = useHeaderStore();
	const title = ['Account', 'Profile', 'Settings'];
	return (
		<div
			className={
				isOpenProfileMenu
					? `${scss.ProfileMenu} ${scss.active}`
					: `${scss.ProfileMenu}`
			}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className={scss.content}>
				{title.map((el, idx) => (
					<div key={idx} className={scss.text}>
						<p>{el}</p>
					</div>
				))}
				<hr />
				<div className={scss.logout}>
					<button onClick={logout}>Logout</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileMenu;
