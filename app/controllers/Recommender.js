const Book = require('../models/book');
const User = require('../models/user');
const Reco = require('../models/Recommender');
exports.getRec = function (req, res) {
    let user = req.session.user;
    if (!user) {
        res.json({code: -1});
        return ;
    }
    let data = {};
    User.find(function (err, users) {
        for(let user of users){
            data[user.username] = {};
            for(let sp of user.shopCart){
                data[user.username][sp.bookId] = 5;
            }
            for(let ws of user.wishList){
                data[user.username][ws.bookId] = 5;
            }
        }
        let result = new Reco(data, 10);
        let like = result.recommend(user.username);
        console.log(like);
        let likes = [];
        for(let i=0;i<4;i++){
            likes[i] = {_id:like[i]}
        }
        Book.getPage({"$or":likes}, function (err, books) {
            res.json(books);
        });
    });
};

exports.init = function (req, res) {
    // let rint = parseInt(Math.random()*100+1);
    // let randStr = Math.random().toString(32).substr(2);
    // Book.find({},{},{limit:4,skip:rint},function (err, books) {
    //     let idArr = [];
    //     let shopcats=[];
    //     for(item of books){
    //         idArr.push({bookId:item.id});
    //         shopcats.push({bookId:item._id,bookNum:1});
    //     }
    //     let user = new User({username: randStr,password: randStr,shopCart:shopcats,wishList:idArr});
    //     user.save(function (err, user) {
    //         res.json(user);
    //     });
    // });
    let data = {};
    User.find(function (err, users) {
        for(let user of users){
            data[user.username] = {};
            for(let sp of user.shopCart){
                data[user.username][sp.bookId] = 5;
            }
            for(let ws of user.wishList){
                data[user.username][ws.bookId] = 5;
            }
        }
        let result = new Reco(data, 10);
        let like = result.recommend("7n3f619jii");
        res.json(like);
    });
};