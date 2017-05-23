let User = require('../models/user');
const Book = require('../models/book');

//登录
exports.login = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({username:username}, function (err, user) {
        if(err){
            console.log(err);
        }
        if(!user) {
            console.log(err);
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user;
                return res.redirect('/index?username='+user.username);
            }else {
                console.log("密码错误");
            }
        });
    });
};

//注册
exports.signup = function (req, res) {
    let _user = req.body.user;
    let user = new User(_user);
    User.findOne({username: _user.username}, function (err) {
        if (err) {
            return res.json({
                code: '1',
                msg: '用户名已存在',
            });
        }

        user.save(function (err, user) {
            if (err) {
                console.log(err);
                return res.json({
                    code: '1',
                    msg: '用户名已存在',
                });
            }

            req.session.user = user;
            return res.json({
                code: '0',
                msg: '注册成功',
            });
        });
    });
};

//注销
exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/login');
};

exports.addCart = function (req, res) {
    let userId = req.session.user._id;
    let bookId = req.body.bookId;
    let bookNum = req.body.bookNum;
    User.addCart(userId, bookId, bookNum, function (error) {
        if(error){
            res.end(error);
        }
        res.end("添加成功");
    });
};

exports.addWish = function (req, res) {
    let userId = req.session.user._id;
    let bookId = req.body.bookId;
    User.addWish(userId, bookId, function (error) {
        if(error){
            res.end(error);
        }
        res.end("收藏成功");
    })
};

exports.getCart = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    let userId = req.session.user._id;
    User.findById(userId,function (err, user) {
        if(err){
            console.log(err);
        }else{
            let shopcarts = user.shopCart;
            let idArr = [];
            let numArr = {};

            for(let shopcart of shopcarts){
                let id = shopcart.bookId;
                idArr.push({_id:id});
                numArr[id] = shopcart.bookNum;
            }
            Book.getPage({"$or":idArr},function (err, books) {
                if(err){
                    console.log(err);
                }else {
                    let bookObjects = [];
                    for (let i = 0; i < books.length; i++) {
                        bookObjects[i] = {};
                        bookObjects[i].bookName = books[i].bookName;
                        bookObjects[i].new_price = books[i]['new_price'];
                        bookObjects[i].book_photo = books[i]['book_photo'];
                        bookObjects[i].num = numArr[books[i]['_id']];
                        bookObjects[i]._id = books[i]['_id'];
                    }
                    res.json(bookObjects);
                }
            });
        }
    });
};

// 删除购物车
exports.deleteCart = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    let {_id} = req.query;
    User.update({username: user.username}, {$pull: {shopCart: {bookId: _id}}}, function (err) {
        res.json({code: 0});
    });
};

// 获取用户名
exports.getUserName = function (req, res) {
    let user = req.session.user;
    if (user) {
        res.json({code: 0, username: user.username});
    } else {
        res.json({code: -1});
    }
};

// 获取购物车数量
exports.getCartNum = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    User.findOne({username: user.username}, function (err, user) {
        res.json({code:0, num: user.shopCart.length});
    });
};

// 获取收货地址列表
exports.getTransportList = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    User.findOne({username: user.username}, function (err, user) {
        res.json({code:0, transport: user.transport});
    });
};

// 增加收货地址
exports.addTransport = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    let {name, phone, address} = req.body;
    User.update({username: user.username}, {"$push": {transport: {name, phone, address}}}, function (err) {
        res.json({code: 0});
    });
};

// 删除收货地址
exports.deleteTransport = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    let {_id} = req.query;
    User.update({username: user.username}, {$pull: {transport: {_id}}}, function (err) {
        res.json({code: 0});
    });
};

// 获取愿望单列表
exports.getWishList = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    User.findOne({username: user.username}, function (err, user) {
        let wishLists = user.wishList;
        let idArr = [];

        for(let wishList of wishLists){
            let id = wishList.bookId;
            idArr.push({_id:id});
        }
        if (idArr.length === 0) {
            return res.json({code: 0, wishList: []});
        }
        Book.getPage({"$or":idArr},function (err, books) {
            let bookObjects = [];
            for (let i = 0; i < books.length; i++) {
                bookObjects[i] = {};
                bookObjects[i].name = books[i]['bookName'];
                bookObjects[i].photo = books[i]['book_photo'];
                bookObjects[i]._id = books[i]['_id'];
            }
            res.json(bookObjects);
        });
    });
};

// 增加愿望单
exports.addWishList = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    let {bookId} = req.body;
    User.update({username: user.username}, {"$push": {wishList: {bookId}}}, function (err) {
        res.json({code: 0});
    });
};

// 删除愿望单
exports.deleteWishList = function (req, res) {
    let user = req.session.user;
    if (!user) {
        return res.json({code: -1});
    }
    let {_id} = req.query;
    User.update({username: user.username}, {$pull: {wishList: {bookId: _id}}}, function (err) {
        res.json({code: 0});
    });
};