import axios from 'axios';

export const authSignupAction = async (userState, success, fail) => {
    const { name, email, password, confirmPassword } = userState;

    if (!name) return fail("이름을 입력하세요.");
    if (!email) return fail("이메일을 입력하세요.");
    if (!password) return fail("비밀번호를 입력하세요.");
    if (password !== confirmPassword) return fail("비밀번호가 일치하지 않습니다.");

    const payload = { name, email, password };
    const { data: { ok, user, error } } = await axios.post('/api/auth', payload);

    if (!ok) return fail(error);
    return success(user);
};

export const authSigninAction = async (userState, success, fail) => {
    const { email, password } = userState;

    if (!email) return fail("이메일을 입력하세요.");
    if (!password) return fail("비밀번호를 입력하세요.");

    const payload = { email, password };
    const { data: { ok, user, error } } = await axios.patch('/api/auth', payload);

    if (!ok) return fail(error);
    return success(user);
};

export const authSignoutAction = async (success, fail) => {
    const { data: { ok, error } } = await axios.delete('/api/auth');

    if (!ok) return fail(error);
    return success(false);
};

export const authCheckAction = async (success, fail) => {
    const { data: { ok, user, error } } = await axios.get('/api/auth');
    if (!ok) {
        success(false);
        return fail(error);
    };

    return success(user);
};