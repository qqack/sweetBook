let mongoose = require('mongoose');
let bookSchema = new mongoose.Schema({
    bookName:String,
    author:String,
    publish:String,
    old_price:Number,
    new_price:Number,
    publish_time:String,
    language:String,
    book_photo:String,
    book_tag:String,
    book_desc:String,
    author_desc:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

bookSchema.pre('save',function (next) {
    /*判断是否为新数据*/
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});

bookSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (query,fileds,id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },
    getPage: function (query,fileds,opt,callback) {
        return this.find(query, fileds, opt, callback);
    }
};

module.exports = bookSchema;