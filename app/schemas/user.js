let mongoose = require('mongoose');
let bcryptjs = require('bcryptjs');
let SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    password: String,
    shopCart:[{
        bookId: String,
        bookNum: Number
    }],
    wishList:[{
        bookId: String
    }],
    transport: [{
        name: String,
        phone: String,
        address: String,

    }],
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

UserSchema.pre('save', function (next) {
    let user = this;
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    bcryptjs.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if(err)
            return next(err);
        bcryptjs.hash(user.password,salt,function (err,hash) {
            if(err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcryptjs.compare(_password, this.password, function (err, isMatch) {
            if(err)
                return cb(err);
            cb(null, isMatch);
        })
    }
};

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function (id,cb) {
        return this.findOne({_id:id})
            .exec(cb)
    },
    addCart:function (userId,bookId, bookNum,callback) {
        let conditions = {_id: userId};
        let update = {"$push": {shopCart: {bookId,bookNum}}};
        return this.update(conditions, update, callback);
    },
    addWish:function (userId,bookId,callback) {
        let conditions = {_id: userId};
        let update = {"$push": {wishList: {bookId}}};
        return this.update(conditions, update, callback);
    }
};

module.exports = UserSchema;