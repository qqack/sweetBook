const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const ObjectId = Schema.Types.ObjectId;
const CommentSchema = new Schema({
    Book:{type: ObjectId, ref: 'Book'},
    from:{type: ObjectId, ref: 'User'},
    to:{type: ObjectId, ref: 'User'},
    content: String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

CommentSchema.pre('save', function (next) {
    let user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
});


CommentSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function (id,cb) {
        return this.findOne({_id:id})
            .exec(cb)
    }
};

module.exports = CommentSchema;