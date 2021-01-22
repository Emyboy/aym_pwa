import React from 'react'
import ReactDOM from 'react-dom'
import { AppContextProvider } from '../context/AppContext'
import Head from 'next/head'
import App from 'next/app'
import 'react-activity/dist/react-activity.css';
// import { createMuiTheme } from '@material-ui/core/styles'
// import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import '../assets/css/plugins/plugins.css'
import '../assets/css/vendor/base.css'
// import '../assets/css/vendor/font-awesome.css'
import '../assets/css/vendor/slick-theme.css'
import '../assets/css/vendor/slick.css'
import '../assets/css/vendor/bootstrap.min.css';
import '../assets/css/style.css';
import '../assets/css/App.css';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		}
	}

	componentDidMount() {
		if (process.env.NODE_ENV !== 'production') {
			const axe = require('react-axe')
			axe(React, ReactDOM, 1000)
		}
	}

	render() {
		const { Component, pageProps } = this.props

		// const theme = createMuiTheme({
		// 	palette: {
		// 		background: {
		// 			default: '#EEE',
		// 		},
		// 		primary: {
		// 			main: '#673ab7',
		// 		},
		// 	},
		// })

		return (
			<>
				<Head>
					<title>African Youth Minds</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
				</Head>
				{/* <ThemeProvider theme={theme}> */}
					{/* <CssBaseline> */}
				<AppContextProvider>
					<Header />
						<Component {...pageProps} />
					<Footer />
				</AppContextProvider>
					{/* </CssBaseline> */}
				{/* </ThemeProvider> */}
			</>
		)
	}
}
