import axios from 'axios';

export const getCommentsAction = async (articleID) => {
    const { data } = await axios.get(`/api/articles/${articleID}/comments`);
    const { ok, comments, error } = data;
    return { ok, comments, error };
};

export const createCommentAction = async (articleID, body) => {
    const { data } = await axios.post(`/api/articles/${articleID}/comments`, body);
    const { ok, comment, error } = data;
    return { ok, comment, error };
};

export const updateCommentAction = async (articleID, commentID, body) => {
    const { data } = await axios.patch(`/api/articles/${articleID}/comments/${commentID}`, body);
    const { ok, comment, error } = data;
    return { ok, comment, error };
};

export const deleteCommentAction = async (articleID, commentID) => {
    const { data } = await axios.delete(`/api/articles/${articleID}/comments/${commentID}`);
    const { ok, error } = data;
    return { ok, error };
};