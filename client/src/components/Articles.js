import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticlesAction } from "../actions/actions.articles";

const styles = () => ({
    wrapper: {
        background: '#fff',
        width: '100%',
        maxWidth: '700px',
        padding: 20,
        borderRadius: 10,
        boxSizing: 'border-box'
    },
    list: {
        listStyle: 'none',
        padding: 0
    },
    item: {
        padding: "10px 0"
    },
    link: {
        textDecoration: 'none'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

const getArticles = async (hook) => {
    const { ok, articles, error } = await getArticlesAction();
    if (!ok) return alert(error);
    hook(articles);
};

const Articles = (props) => {
    const { classes } = props;
    const [articles, setArticles] = useState();

    useEffect(() => {
        return () => getArticles(setArticles);
    }, []);

    if (!articles) return (<></>)

    return (
        <div className={classes.wrapper}>
            <ul className={classes.list}>
                {
                    articles.map((article, key) => {
                        const { articleID, title, createdAt, author } = article;
                        const { name, email } = author;
                        const linkProps = { className: classes.link, to: `/${articleID}` };
                        return (
                            <li key={key} className={classes.item}>
                                <p className={classes.row}>
                                    <Link {...linkProps}>{title}</Link>
                                    <span>{name} : {createdAt}</span>
                                </p>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default withStyles(styles)(Articles);