import createAuth0Client, { Auth0Client, User } from "@auth0/auth0-spa-js";
import React, { useContext, useEffect, useState } from "react";

export const AuthProvider: React.FC = ({ children }) => {
  const [auth0, setAuth0] = useState<Auth0Client | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    createAuth0Client({
      domain: "dev-cfu-0oq8.auth0.com",
      client_id: "HZYe4PgXY7AmFc532MTcDjfGAYl0ZY43",
      redirect_uri: "https://nitecrawler-ui.azurewebsites.net",
      // redirect_uri: "http://localhost:3000",
      audience: "https://croll.dev/api",
    }).then((auth0) => {
      setAuth0(auth0);

      if (window.location.search.includes("code=")) {
        auth0.handleRedirectCallback().then(() => {
          window.location.href = "/";
        });
      }

      auth0.getUser().then((user) => {
        if (user) {
          setUser(user);
        }
      });
    });
  }, []);

  const login = () => {
    auth0?.loginWithRedirect();
  };

  const logout = () => {
    auth0?.logout({
      returnTo: "https://nitecrawler-ui.azurewebsites.net/",
    });
  };

  const getToken = async () => {
    let token = null;

    try {
      token = await auth0?.getTokenSilently();
    } catch (e) {
      // do nothing
    }

    return token;
  };

  return (
    <AuthContext.Provider value={{ login, logout, getToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = React.createContext<AuthContextValues>({
  user: null,
});

type AuthContextValues = {
  login?(): void;
  logout?(): void;
  getToken?(): Promise<string | null>;
  user: User | null;
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
