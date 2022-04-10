'use strict';

const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET;

class AuthService {
    static async signup(dto) {
        const { name, email, password } = dto;

        if (!name) throw Error('이름을 입력하세요.');
        if (!email) throw Error('이메일을 입력하세요.');
        if (!password) throw Error('비밀번호를 입력하세요.');

        if (await User.findOne({ email })) throw Error('이미 존재하는 이메일입니다.');
        const user = new User(dto);

        const { _id } = user;

        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.token = jwt.sign(_id.toHexString(), secret);
            user.tokenExp = 3600
        } catch {
            throw Error('토큰 생성 과정에서 오류가 발생하였습니다.');
        }

        await user.save();
        return { token: user.token, tokenExp: user.tokenExp };
    };

    static async signin(dto) {
        const { email, password } = dto;
        const user = await User.findOne({ email });

        if (!user) throw Error('존재하지 않는 계정입니다.');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw Error('비밀번호가 일치하지 않습니다.');

        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.token = jwt.sign(user._id.toHexString(), secret);
            user.tokenExp = 3600;
        } catch (error) {
            console.log(error)
            throw Error('토큰 생성 과정에서 오류가 발생하였습니다.');
        };

        await user.save();
        return { token: user.token, tokenExp: user.tokenExp };
    };

    static async signout(dto) {
        const user = dto;
        try {
            const { _id } = user;
            await User.findOneAndUpdate({ _id }, { token: '', tokenExp: 0 });
        } catch {
            throw Error('알 수 없는 오류가 발생하였습니다.');
        };
    };

    static async findUserByToken(token) {
        try {
            const _id = jwt.verify(token, secret);
            return await User.findOne({ _id, token });
        } catch {
            throw Error('접근 권한이 없습니다.');
        };
    };
};

module.exports = AuthService;