import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import withStyles from "@mui/styles/withStyles";
import Header from "./components/Header";
import ArticleWrite from "./components/ArticleWrite";
import Article from "./components/Article";
import ArticleEdit from "./components/ArticleEdit";

const styles = () => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});


const App = (props) => {
  const { classes } = props;

  return (
    <div className={classes.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/write" element={<ArticleWrite />} />
        <Route path="/:articleID" element={<Article />} />
        <Route path="/:articleID/edit" element={<ArticleEdit />} />
      </Routes>
    </div>
  )
}

export default withStyles(styles)(App);