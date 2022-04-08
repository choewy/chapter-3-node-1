import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";

const styles = () => ({
    list: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'row'
    },
    item: {
        padding: 10
    }
});

const Header = (props) => {
    const { classes } = props;

    return (
        <ul className={classes.list}>
            <li className={classes.item}><Link to="/">홈</Link></li>
            <li className={classes.item}><Link to="/write">글작성</Link></li>
        </ul>
    )
};

export default withStyles(styles)(Header);