import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return <h1>{currentUser ? "You are signed in" : "Please sign in"}</h1>;
};

// getInitialProps is executed on
// - server when:
//  - hard refresh of page
//  - clicking link from different domain
//  - typing url into address bar
// - client when:
//  - navigating from one page to another while in the app
LandingPage.getInitialProps = async (contex) => {
  const response = await buildClient(contex).get("/api/users/currentuser");

  return response.data;
};

export default LandingPage;
