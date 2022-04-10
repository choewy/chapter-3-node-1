import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { createCommentAction } from "../actions/actions.comments";

const styles = () => ({
    input: {
        width: '100%',
        boxSizing: 'border-box',
        padding: "10px 20px",
        border: 0,
        borderBottom: "1px solid #ddd",
        borderRadius: "5px 5px 0 0"
    },
    textarea: {
        width: '100%',
        resize: 'none',
        maxHeight: '500px',
        padding: "10px 20px",
        boxSizing: 'border-box',
        border: 0,
        borderBottom: "1px solid #ddd",
        borderRadius: "0 0 5px 5px "
    },
    btnBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: "0 0 30px"
    },
    btn: {
        cursor: 'pointer'
    }
});

const CommentReply = (props) => {
    const { classes, articleID, user, refreshComments } = props;
    const [body, setBody] = useState({
        text: '',
    });

    const valueChange = (e) => {
        const { target: { name, value } } = e;
        setBody({ ...body, [name]: value });
    };

    const enterKeyDown = async (e) => {
        const { shiftKey, keyCode } = e;
        if (!shiftKey && keyCode === 13) {
            e.preventDefault();
            await submitComment();
        };
    };

    const submitComment = async () => {
        if (body.text === '') return alert('댓글 내용을 입력하세요.');
        const { ok, error } = await createCommentAction(articleID, body);

        if (!ok) return alert(error);
        await refreshComments();
        setBody({ ...body, text: '' });
    };

    const textAreaProps = {
        className: classes.textarea,
        placeholder: user ? "댓글 내용을 입력하세요." : "댓글을 남기기 위해서는 먼저 로그인을 해야합니다.",
        disabled: user ? false : true,
        rows: 5,
        name: 'text',
        value: body.text,
        autoComplete: 'off',
        onKeyDown: enterKeyDown,
        onChange: valueChange
    }

    return (
        <div>
            <textarea {...textAreaProps} />
            <div className={classes.btnBox}>
                {user && <button className={classes.btn} onClick={submitComment}>등록</button>}
            </div>
        </div>
    );
};

export default withStyles(styles)(CommentReply);