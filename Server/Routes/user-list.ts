import express from 'express';
const router = express.Router();

import { DisplayAddPage, DisplayEditPage, DisplayUserListPage, ProcessAddPage, ProcessDeletePage, ProcessEditPage } from '../Controllers/user-list';

import { AuthGuard } from '../Util/index';

/* Display User List Page */
router.get('/user-list', AuthGuard, DisplayUserListPage);

/* Display Add Page */
router.get('/user/add', AuthGuard, DisplayAddPage);

/* Display Edit Page */
router.get('/user/edit/:id', AuthGuard, DisplayEditPage);

/* Process Add Page */
router.post('/user/add', AuthGuard, ProcessAddPage);

/* Process Edit Page */
router.post('/user/edit/:id', AuthGuard, ProcessEditPage);

/* Process Delete Page */
router.get('/user/delete/:id', AuthGuard, ProcessDeletePage);

export default router;