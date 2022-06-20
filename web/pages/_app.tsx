import '../styles/globals.css';
import TopBar from '../components/TopBar';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  	return (
		<div>
			<TopBar />
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
