import express from 'express';
import {test} from '../controllers/user.controller.js';

import { verifyToken , updateUser,getUserListings} from '../utils/verifyUser.js';
import {deleteUser,getUser} from '../controllers/user.controller.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;