import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { updateCommentAction } from "../actions/actions.comments";

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

const CommentEdit = (props) => {
    const { classes, articleID, comment, refreshComments, setEdit } = props;
    const { commentID, text } = comment;
    const [body, setBody] = useState({ text });

    const valueChange = (e) => {
        const { target: { name, value } } = e;
        setBody({ ...body, [name]: value });
    };

    const enterKeyDown = async (e) => {
        const { shiftKey, keyCode } = e;
        if (!shiftKey && keyCode === 13) {
            e.preventDefault();
            await saveComment();
        };
    };

    const saveComment = async () => {
        if (body.text === '') return alert('댓글 내용을 입력하세요.');
        const { ok, error } = await updateCommentAction(articleID, commentID, body);
        if (!ok) return alert(error);
        await refreshComments();
        setEdit(false);
    };

    const cancelClick = () => setEdit(false);

    return (
        <div>
            <textarea
                className={classes.textarea}
                placeholder="댓글 내용을 입력하세요."
                rows={5}
                name="text"
                value={body.text}
                autoComplete='off'
                onKeyDown={enterKeyDown}
                onChange={valueChange} />

            <div className={classes.btnBox}>
                <button className={classes.btn} onClick={saveComment}>저장</button>
                <button className={classes.btn} onClick={cancelClick}>취소</button>
            </div>
        </div>
    );
};

export default withStyles(styles)(CommentEdit);