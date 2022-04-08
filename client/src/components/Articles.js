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
        getArticles(setArticles);
    }, []);

    if (!articles) return (<></>)

    return (
        <div className={classes.wrapper}>
            <ul className={classes.list}>
                {
                    articles.map((article, key) => {
                        const { articleID, title, createdAt } = article;
                        const linkProps = { className: classes.link, to: `/${articleID}` };
                        return (
                            <li key={key} className={classes.item}>
                                <Link {...linkProps}>{`[${createdAt}]`} {title}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default withStyles(styles)(Articles);