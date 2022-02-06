import "bootstrap/dist/css/bootstrap.css";

// by default next js wrapes its pages to its own react component where we can't
// inject our global values so overriding their react component with our own
export default ({ Component, pageProps }) => <Component {...pageProps} />;
