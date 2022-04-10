import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useState } from "react";
import { deleteCommentAction } from "../actions/actions.comments";
import CommentEdit from "./CommentEdit";

const styles = () => ({
    wrapper: {
        background: '#fff',
        width: '100%',
        maxWidth: '700px',
        padding: '2px 20px 15px',
        margin: '5px 0',
        borderRadius: 5,
        boxSizing: 'border-box'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 13,
        paddingBottom: '10px',
        borderBottom: '1px solid #ddd'
    },
    text: {
        whiteSpace: 'pre-wrap',
        fontSize: 14
    },
    block: {
        display: 'block'
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

const Comment = (props) => {
    const { classes, articleID, user, comment, refreshComments } = props;
    const { commentID, author } = comment;
    const [edit, setEdit] = useState(false);

    const editButtonClick = async () => setEdit(true);

    const deleteButtonClick = async () => {
        const flag = window.confirm('댓글을 삭제하시겠습니까?');
        if (!flag) return;

        const { ok, error } = await deleteCommentAction(articleID, commentID);
        if (!ok) return alert(error);

        refreshComments();
    };

    if (!edit) {
        return (<>
            <div className={classes.wrapper}>
                <p className={classes.info}>
                    <b><span>{author.name}({author.email})</span></b>
                    <span>{comment.createdAt}</span>
                </p>
                <div>
                    <div className={classes.text}>{comment.text}</div>
                </div>
                {
                    (user && user._id === author._id)
                        ? (<div className={classes.btnBox}>
                            <button onClick={editButtonClick}>수정</button>
                            <button onClick={deleteButtonClick}>삭제</button>
                        </div>)
                        : <div className={classes.btnBox} />
                }
            </div>
        </>);
    };

    const editProps = { articleID, user, comment, refreshComments, setEdit };

    return <CommentEdit {...editProps} />;
};

export default withStyles(styles)(Comment);