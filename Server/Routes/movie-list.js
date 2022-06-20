"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const movie_list_1 = require("../Controllers/movie-list");
const index_1 = require("../Util/index");
router.get('/movie-list', index_1.AuthGuard, movie_list_1.DisplayMovieListPage);
router.get('/movie/add', index_1.AuthGuard, movie_list_1.DisplayAddPage);
router.get('/movie/edit/:id', index_1.AuthGuard, movie_list_1.DisplayEditPage);
router.post('/movie/add', index_1.AuthGuard, movie_list_1.ProcessAddPage);
router.post('/movie/edit/:id', index_1.AuthGuard, movie_list_1.ProcessEditPage);
router.get('/movie/delete/:id', index_1.AuthGuard, movie_list_1.ProcessDeletePage);
exports.default = router;
//# sourceMappingURL=movie-list.js.map