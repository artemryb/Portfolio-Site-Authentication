import express from 'express';
const router = express.Router();

import { DisplayAddPage, DisplayEditPage, DisplayMovieListPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/movie-list';

import { AuthGuard } from '../Util/index';

/* Display Movie List Page */
router.get('/movie-list', AuthGuard, DisplayMovieListPage);

/* Display Add Page */
router.get('/movie/add', AuthGuard, DisplayAddPage);

/* Display Edit Page */
router.get('/movie/edit/:id', AuthGuard, DisplayEditPage);

/* Process Add Page */
router.post('/movie/add', AuthGuard, ProcessAddPage);

/* Process Edit Page */
router.post('/movie/edit/:id', AuthGuard, ProcessEditPage);

/* Process Delete Page */
router.get('/movie/delete/:id', AuthGuard, ProcessDeletePage);

export default router;