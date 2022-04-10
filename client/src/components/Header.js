import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import { userSignoutAction } from "../actions/actions.auth";

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
    const { classes, user, refreshAuth } = props;

    if (user === null) return <></>;

    const signOutClick = async () => {
        await userSignoutAction();
        await refreshAuth();
    };

    return (
        <ul className={classes.list}>
            <li className={classes.item}><Link to="/">홈</Link></li>
            {user && <li className={classes.item}><Link to="/write">글작성</Link></li>}
            {!user && <li className={classes.item}><Link to="/signin">로그인</Link></li>}
            {!user && <li className={classes.item}><Link to="/signup">회원가입</Link></li>}
            {user && <li className={classes.item}><a href="/signin" onClick={signOutClick}>로그아웃</a></li>}
        </ul>
    )
};

export default withStyles(styles)(Header);