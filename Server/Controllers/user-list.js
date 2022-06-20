"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayUserListPage = void 0;
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function DisplayUserListPage(req, res, next) {
    user_1.default.find(function (err, usersCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'User List', page: 'user-list', users: usersCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayUserListPage = DisplayUserListPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: "Add", page: 'user-add', messages: req.flash("addUserMessage"), displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    user_1.default.findById(id, {}, {}, function (err, userToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: "Edit", page: 'user-edit', user: userToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newUser = new user_1.default({
        "username": req.body.userName,
        "EmailAddress": req.body.emailAddress,
        "DisplayName": req.body.displayName,
    });
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error('ERROR: User Already Exists!');
                req.flash('addUserMessage', 'A user with the same name already exists!');
            }
            else {
                console.error(err.name);
                req.flash('addUserMessage', 'Server Error');
            }
            return res.redirect('/user/add');
        }
        res.redirect('/user-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedUser = new user_1.default({
        "_id": id,
        "DisplayName": req.body.displayName,
        "username": req.body.userName,
        "EmailAddress": req.body.emailAddress,
    });
    user_1.default.updateOne({ _id: id }, updatedUser, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/user-list');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    user_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/user-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=user-list.js.map