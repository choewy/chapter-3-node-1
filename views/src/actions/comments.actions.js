import axios from 'axios';

export const getCommentsAction = async (articleId, success, fail) => {
    const { data: { ok, comments, error } } = await axios.get(`/api/articles/${articleId}/comments`);

    if (!ok) return fail(error);
    return success(comments);
};

export const createCommentAction = async (articleId, state, success, fail) => {
    const { content } = state;

    if (!content) return fail("댓글 내용을 입력하세요.");

    const { data: { ok, comment, error } } = await axios.post(`/api/articles/${articleId}/comments`, state);

    if (!ok) return fail(error);
    return success(comment);
};

export const updateCommentAction = async (articleId, commentId, state, success, fail) => {
    const { content } = state;

    if (!content) return fail("댓글 내용을 입력하세요.");

    const { data: { ok, comment, error } } = await axios.patch(`/api/articles/${articleId}/comments/${commentId}`, state);

    if (!ok) return fail(error);
    return success(comment);
};

export const deleteCommentAction = async (articleId, commentId, success, fail) => {
    const { data: { ok, error } } = await axios.delete(`/api/articles/${articleId}/comments/${commentId}`);

    if (!ok) return fail(error);
    return success();
};