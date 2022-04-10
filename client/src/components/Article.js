import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteArticleAction, getArticleByIdAction } from "../actions/actions.articles";
import withStyles from "@mui/styles/withStyles";
import Comments from "./Comments";

const styles = () => ({
    container: {
        width: '100%',
        maxWidth: '700px',
    },
    wrapper: {
        background: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        boxSizing: 'border-box'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 13
    },
    title: {
        paddingBottom: '20px',
        borderBottom: '1px solid #ddd'
    },
    content: {
        whiteSpace: 'pre-wrap',
        fontSize: 14
    },
    btnBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: "5px 0 30px"
    },
    btn: {
        cursor: 'pointer'
    }
});

const Article = (props) => {
    const { classes, user } = props;
    const { articleID } = useParams();
    const [article, setArticle] = useState();

    useEffect(() => {
        const getArticle = async () => {
            const response = await getArticleByIdAction(articleID);
            if (!response.ok) {
                alert(response.error);
                return window.location.pathname = '/';
            };
            setArticle(response.article);
        };

        if (articleID) {
            return () => getArticle();
        };

        return () => { };
    }, [articleID]);

    if (!article) return <></>;

    const { author } = article;
    const commentsProps = { articleID, user };

    const deleteArticle = async () => {
        const flag = window.confirm('게시글을 삭제하시겠습니까?');
        if (!flag) return;
        const { ok, error } = await deleteArticleAction(articleID);
        if (!ok) return alert(error);
        return window.location.pathname = '/';
    };

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <p className={classes.info}>
                    <span>작성자 : {author.name}({author.email})</span>
                    <span>{article.createdAt}</span>
                </p>
                <h1 className={classes.title}>{article.title}</h1>
                <div className={classes.content}>{article.content}</div>
            </div>

            {
                user._id === author._id
                    ? (
                        <div className={classes.btnBox}>
                            <Link to={`/${articleID}/edit`}><button>수정</button></Link>
                            <button onClick={deleteArticle}>삭제</button>
                        </div>
                    )
                    : <div className={classes.btnBox} />
            }
            {author && <Comments {...commentsProps} />}
        </div>
    );
};

export default withStyles(styles)(Article);