import Pages from "../pages";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { useNavigate } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { Toaster } from 'react-hot-toast';
// import { useEffect, useState } from "react";

const CLIENT_ID = "0oa5hrixzgbpayfmA5d7";
const CALLBACK_PATH = "http://localhost:3000/callback";
const ISSUER = "https://dev-09386955.okta.com/oauth2/default";
// const HOST = 'window.location.host';
const REDIRECT_URI = `${CALLBACK_PATH}`;
const SCOPES = "openid profile email";

if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER) {
  throw new Error("All environmental variables must be set");
}

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/),
};

const oktaAuth = new OktaAuth(config);

const Routes = () => {
  const navigate = useNavigate();

  // const useFindPath = () => {
  //   const location = useLocation();
  //   const [currentPath, setCurrentPath] = useState();
  //   useEffect(() => {
  //     setCurrentPath(location.pathname);
  //   }, [location]);
  //   return currentPath;
  // };


  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
      <Toaster />
      <Pages />
    </Security>
  );
};

export default Routes;
