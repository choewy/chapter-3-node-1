import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import withStyles from "@mui/styles/withStyles";
import Header from "./components/Header";
import ArticleWrite from "./components/ArticleWrite";
import Article from "./components/Article";
import ArticleEdit from "./components/ArticleEdit";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { userAuthAction } from "./actions/actions.auth";


const styles = () => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const userAuthCheck = async (hook) => {
  const { auth, user } = await userAuthAction();
  return hook(auth ? user : false);
};

const App = (props) => {
  const { classes } = props;
  const [user, setUser] = useState(null);

  const refreshAuth = async () => await userAuthCheck(setUser);

  useEffect(() => {
    return () => refreshAuth();
  }, []);

  if (user === null) return <></>;

  const userProps = { user, refreshAuth };
  const visitorProps = { refreshAuth };

  return (
    <div className={classes.app}>
      <Header {...userProps} />
      <Routes>
        <Route path="/signin" element={user ? <Navigate to='/' /> : <Signin {...visitorProps} />} />
        <Route path="/signup" element={user ? <Navigate to='/' /> : <Signup {...visitorProps} />} />
        <Route path="/:articleID/edit" element={user ? <ArticleEdit {...userProps} /> : <Navigate to='/signin' />} />
        <Route path="/:articleID" element={<Article user={user} />} />
        <Route path="/write" element={user ? <ArticleWrite user={user} /> : <Navigate to='/signin' />} />
        <Route path="/" element={<Articles />} />
      </Routes>
    </div>
  )
}

export default withStyles(styles)(App);