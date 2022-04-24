import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavLinks } from './NavLinks';
import * as Styles from './styles-navbar';

import { useTheme } from '../../styled/ThemeContext';

const NavBar = () => {
	const themeMode = useTheme();
	const router = useRouter();

	const location = router.pathname;

	const [clicked, setClicked] = useState(false);
	const [activeRoute, setActiveRoute] = useState(location);

	useEffect(() => {
		setActiveRoute(location);
	}, [location]);

	return (
		<Styles.NavBar>
			<div className="container">
				<Styles.Expand>
					<Link href="/" passHref>
						<Styles.NavBarBrandLink onClick={() => setClicked(false)}>
							{activeRoute !== '/' ? 'Home' : null}
						</Styles.NavBarBrandLink>
					</Link>

					<Styles.NavBarNav clicked={clicked} className={clicked ? 'clicked' : ''}>
						<li>
							<Styles.NavBarNavA
								onClick={() => {
									themeMode.toggleTheme();
									setClicked(false);
								}}
							>
								{themeMode.mode === 'dark' ? `Light` : `Dark`}Theme
							</Styles.NavBarNavA>
						</li>

						{NavLinks.map((item, index) => {
							const a = activeRoute === `/${item.url}`;
							return (
								<li key={index}>
									<Link
										href={`/${item.url}`}
										passHref
									>
										<Styles.NavBarNavLink activelink={a.toString()} onClick={()=> setClicked(false)}>{item.title}</Styles.NavBarNavLink>
									</Link>
								</li>
							);
						})}
					</Styles.NavBarNav>

					<Styles.Toggler onClick={() => setClicked(!clicked)}>
						{clicked && <Styles.StyledSvgTimes fill="#ffffff" />}

						{!clicked && <Styles.StyledSvgBars fill="#ffffff" />}
					</Styles.Toggler>
				</Styles.Expand>
			</div>
		</Styles.NavBar>
	);
};

export default NavBar;

