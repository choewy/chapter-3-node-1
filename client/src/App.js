import withStyles from "@mui/styles/withStyles";

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
      App
    </div>
  )
}

export default withStyles(styles)(App);