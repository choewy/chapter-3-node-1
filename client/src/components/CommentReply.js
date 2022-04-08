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
    const { classes, articleID, refreshComments } = props;
    const [body, setBody] = useState({
        author: '',
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
        if (body.author === '') return alert('작성자를 입력하세요.');
        if (body.text === '') return alert('댓글 내용을 입력하세요.');
        const { ok, error } = await createCommentAction(articleID, body);

        if (!ok) return alert(error);
        await refreshComments();
        setBody({ ...body, text: '' });
    };

    return (
        <div>
            <input
                className={classes.input}
                placeholder="작성자"
                name="author"
                value={body.author}
                autoComplete='off'
                onChange={valueChange} />

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
                <button className={classes.btn} onClick={submitComment}>등록</button>
            </div>
        </div>
    );
};

export default withStyles(styles)(CommentReply);