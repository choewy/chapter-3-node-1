import axios from 'axios';

export const getArticlesAction = async () => {
    const { data } = await axios.get('/api/articles');
    const { ok, articles, error } = data;
    return { ok, articles, error };
};

export const getArticleByIdAction = async (articleID) => {
    const { data } = await axios.get(`/api/articles/${articleID}`);
    const { ok, article, error } = data;
    return { ok, article, error };
};

export const createArticleAction = async (body) => {
    const { data } = await axios.post('/api/articles', body);
    const { ok, article, error } = data;
    return { ok, article, error };
};

export const updateArticleAction = async (articleID, body) => {
    const { data } = await axios.patch(`/api/articles/${articleID}`, body);
    const { ok, article, error } = data;
    return { ok, article, error };
};

export const deleteArticleAction = async (articleID) => {
    const { data } = await axios.delete(`/api/articles/${articleID}`);
    const { ok, error } = data;
    return { ok, error };
};