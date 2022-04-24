import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import NavBar from '../NavBar/NavBar';
import DateNow from '../DateNow/DateNow';
import MetaWeather from '../MetaWeather/MetaWeather';
import UserAgent from '../UserAgent/UserAgent';
import Footer from '../Footer/Footer';
import Head from 'next/head';

import { useTheme } from '../../styled/ThemeContext';
import { AppTheme } from '../../styled';
import { Global } from '../../styled';

type Props = {
	children?: ReactNode
	title?: string
}

export const Layout = ({ children, title = 'Next TS Starter App Example' }: Props) => {
	const themeMode = useTheme();
	const key = `${themeMode.mode}` as string;
	const themeModeMode = AppTheme.theme[key as keyof typeof AppTheme.theme];

	return (
		<ThemeProvider theme={themeModeMode}>
			<Global.GlobalStyle />
			<Head>
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"
				/>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="Alex Smith's App" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
				<meta name="apple-mobile-web-app-title" content="Alex Smith's App" />
				<title>{title}</title>
			</Head>

			<NavBar />

			{children}

			<DateNow />

			<MetaWeather />

			<UserAgent />

			<Footer />
		</ThemeProvider>
	)
};
