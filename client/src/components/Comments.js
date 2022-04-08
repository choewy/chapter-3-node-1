import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useEffect, useState } from "react";
import { getCommentsAction } from "../actions/actions.comments";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

const styles = () => ({});

const getComments = async (articleID, hook) => {
    const { ok, comments, error } = await getCommentsAction(articleID);
    if (!ok) return alert(error);
    hook(comments);
};

const Comments = (props) => {
    const { articleID } = props;
    const [comments, setComments] = useState();

    const refreshComments = async () => {
        await getComments(articleID, setComments);
    };

    useEffect(() => {
        getComments(articleID, setComments);
    }, [articleID]);

    if (!comments) return <></>;

    const replyProps = { articleID, refreshComments };

    return (
        <div>
            <CommentReply {...replyProps} />
            {
                comments.map((comment, key) => {
                    const commentProps = { key, articleID, comment, refreshComments }
                    return <Comment {...commentProps} />
                })
            }
        </div>
    );
};

export default withStyles(styles)(Comments);