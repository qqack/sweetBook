let User = require('../models/user');

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
    User.findOne({username:_user.username},function (err, user) {
        if(err){
            console.log(err);
            res.write({
                    code: '0001',
                    msg: '用户名已存在'
                }
            );
        }
    });
    user.save(function(err, user){
        if(err){
            console.log(err);
        }
    });
};

//注销
exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/login');
};