import React, { useEffect } from "react";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createArticleAction } from "../actions/actions.articles";

const styles = () => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px'
    },
    input: {
        width: '100%',
        margin: '5px 0',
        boxSizing: 'border-box',
        border: 0,
        padding: 20,
        borderRadius: 5
    },
    textarea: {
        margin: '5px 0',
        resize: 'none',
        height: '100%',
        maxHeight: '500px',
        border: 0,
        padding: 20,
        borderRadius: 5
    },
    btnBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    btn: {
        cursor: 'pointer'
    }
});


const ArticleWrite = (props) => {
    const { classes, user } = props;
    const navigate = useNavigate();
    const [body, setBody] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        if (!user) window.location.pathname = "/signin";
        return () => { };
    }, [user]);

    const valueChange = (e) => {
        const { target: { name, value } } = e;
        setBody({ ...body, [name]: value });
    };

    const articleSubmit = async (e) => {
        e.preventDefault();

        if (!body.title) return alert('제목을 입력하세요.');
        if (!body.content) return alert('내용을 입력하세요.');

        const { ok, article, error } = await createArticleAction(body);
        if (!ok) return alert(error);
        navigate(`/${article.articleID}`);
    };

    return (
        <form className={classes.form} onSubmit={articleSubmit}>
            <input
                className={classes.input}
                placeholder="제목"
                name="title"
                value={body.title}
                autoComplete='off'
                onChange={valueChange} />

            <textarea
                className={classes.textarea}
                placeholder="내용"
                rows={20}
                name="content"
                value={body.content}
                autoComplete='off'
                onChange={valueChange} />

            <div className={classes.btnBox}>
                <Link className={classes.link} to='/'>
                    <button className={classes.btn} type="button">
                        취소
                    </button>
                </Link>
                <button className={classes.btn} type="submit">제출</button>
            </div>
        </form>
    );
};

export default withStyles(styles)(ArticleWrite);