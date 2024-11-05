'use client';
import { FC, ReactNode, useEffect, useState } from 'react';
import scss from './LayoutSite.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import { useGetMeQuery } from '@/redux/api/me';
import { useHeaderStore } from '@/stores/useHeaderStore';
import Preloader from '../ui/preLoader/Preloader';
import PlayList from '../pages/homeSections/PlayList';
import FooterPage from '../shared/FooterPage';

interface LayoutSiteProps {
	children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
	const { status } = useGetMeQuery();
	const [isPreloader, setIsPreloader] = useState(true);
	const { setIsOpenProfileMenu, setIsOpenBurgerMenu } = useHeaderStore();

	const handleLayout = () => {
		setIsOpenProfileMenu(false);
		setIsOpenBurgerMenu(false);
	};

	useEffect(() => {
		if (status === 'fulfilled' || status === 'rejected') {
			setTimeout(() => {
				setIsPreloader(false);
			}, 700);
		}
	}, [status]);

	return (
		<>
			{isPreloader ? (
				<>
					<Preloader />
				</>
			) : (
				<>
					<div className={scss.LayoutSite} onClick={handleLayout}>
						<Header />
						<div className={scss.content}>
							<PlayList />
							<main>{children}</main>
							{/* <FooterPage /> */}
						</div>
						<Footer />
					</div>
				</>
			)}
		</>
	);
};

export default LayoutSite;