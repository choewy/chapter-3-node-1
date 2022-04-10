import React from "react";
import withStyles from "@mui/styles/withStyles";
import { useEffect, useState } from "react";
import { getCommentsAction } from "../actions/actions.comments";
import Comment from "./Comment";
import CommentReply from "./CommentReply";

const styles = () => ({});

const getComments = async (articleID, hook) => {
    const { ok, comments } = await getCommentsAction(articleID);
    if (ok) return hook(comments);
};

const Comments = (props) => {
    const { articleID, user } = props;
    const [comments, setComments] = useState();

    const refreshComments = async () => {
        await getComments(articleID, setComments);
    };

    useEffect(() => {
        if (articleID) {
            return () => getComments(articleID, setComments);
        };
    }, [articleID]);

    if (!comments) return <></>;

    const replyProps = { articleID, user, refreshComments };

    return (
        <div>
            <CommentReply {...replyProps} />
            {
                comments.map((comment, key) => {
                    const commentProps = { key, articleID, user, comment, refreshComments }
                    return <Comment {...commentProps} />
                })
            }
        </div>
    );
};

export default withStyles(styles)(Comments);