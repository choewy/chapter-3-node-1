'use strict';

const dateFormat = (date) => {
    const dt = new Date(date);
    const koreaHour = dt.getHours() + 9 >= 24 ? dt.getHours() - 15 : dt.getHours() + 9;
    return [
        dt.getFullYear(), "-",
        `0${dt.getMonth() + 1}`.slice(-2) + "-",
        `0${dt.getDate()}`.slice(-2), " ",
        `0${koreaHour}`.slice(-2), ":",
        `0${dt.getMinutes()}`.slice(-2)
    ].join('');
};

const rowDateFormat = (row) => {
    const { createdAt, updatedAt } = row;
    return {
        ...row._doc,
        createdAt: dateFormat(createdAt),
        updatedAt: dateFormat(updatedAt)
    };
};

module.exports = rowDateFormat;