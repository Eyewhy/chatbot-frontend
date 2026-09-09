import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../src/index.css';
import '../src/App.css';
import 'react-toastify/dist/ReactToastify.css';
import '@ryaneewx/react-chat-widget/lib/styles.css';
import 'react-chat-elements/dist/main.css';
import '../src/next/public.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
