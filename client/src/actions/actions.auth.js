import axios from 'axios';


export const userAuthAction = async () => {
    const { data } = await axios.get('/api/auth');
    const { auth, user, error } = data;
    return { auth, user, error };
};

export const userSignupAction = async (body) => {
    const { data } = await axios.post('/api/auth/signup', body);
    const { ok, error } = data;
    return { ok, error };
};

export const userSigninAction = async (body) => {
    const { data } = await axios.post('/api/auth/signin', body);
    const { ok, user, error } = data;
    return { ok, user, error };
};

export const userSignoutAction = async () => {
    const { data } = await axios.delete('/api/auth/signout');
    const { ok, error } = data;
    return { ok, error };
};