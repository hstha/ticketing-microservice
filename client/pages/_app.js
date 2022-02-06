import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import { Header } from "../components";

// by default next js wrapes its pages to its own react component where we can't
// inject our global values so overriding their react component with our own
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="container">
      <Header currentUser={currentUser} />
      <Component {...pageProps} />;
    </div>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  const response = await buildClient(ctx).get("/api/users/currentuser");

  // when we invoke getInitialProps in main component than
  // it's child component getInitialProps is not invoked,
  // so manually invoking
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {
    pageProps,
    ...response.data,
  };
};

export default AppComponent;
