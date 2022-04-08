const Increment = require("./increment.model");

class IncrementService {
    static async initArticleSequence() {
        const doc = { schema: 'article' };
        const row = await Increment.findOne(doc);
        if (row) return;
        await Increment.create(doc);
    };

    static async initCommentSequence() {
        const doc = { schema: 'comment' };
        const row = await Increment.findOne(doc);
        if (row) return;
        await Increment.create(doc);
    };

    static async articleSequence() {
        const doc = { schema: 'article' }
        const { seq } = await Increment.findOneAndUpdate(
            doc, { $inc: { seq: 1 } }, { new: true }
        );
        return seq;
    };

    static async commentSequence() {
        const doc = { schema: 'comment' }
        const { seq } = await Increment.findOneAndUpdate(
            doc, { $inc: { seq: 1 } }, { new: true }
        );
        return seq;
    };
};

module.exports = IncrementService;