import React from 'react'
import ReactDOM from 'react-dom'
import { AppContextProvider } from '../context/AppContext'
import Head from 'next/head'
import App from 'next/app'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import '../assets/css/style.css';
import '../assets/css/vendor/bootstrap.min.css';
import '../assets/css/App.css';
import Header from '../components/Header'

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

		const theme = createMuiTheme({
			palette: {
				background: {
					default: '#EEE',
				},
				primary: {
					main: '#673ab7',
				},
			},
		})

		return (
			<>
				<Head>
					<title>Todo App</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				{/* <ThemeProvider theme={theme}> */}
					{/* <CssBaseline> */}
				<AppContextProvider>
					<Header />
						<Component {...pageProps} />
				</AppContextProvider>
					{/* </CssBaseline> */}
				{/* </ThemeProvider> */}
			</>
		)
	}
}
