"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_list_1 = require("../Controllers/user-list");
const index_1 = require("../Util/index");
router.get('/user-list', index_1.AuthGuard, user_list_1.DisplayUserListPage);
router.get('/user/add', index_1.AuthGuard, user_list_1.DisplayAddPage);
router.get('/user/edit/:id', index_1.AuthGuard, user_list_1.DisplayEditPage);
router.post('/user/add', index_1.AuthGuard, user_list_1.ProcessAddPage);
router.post('/user/edit/:id', index_1.AuthGuard, user_list_1.ProcessEditPage);
router.get('/user/delete/:id', index_1.AuthGuard, user_list_1.ProcessDeletePage);
exports.default = router;
//# sourceMappingURL=user-list.js.map