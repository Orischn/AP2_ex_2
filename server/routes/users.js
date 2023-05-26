import express from 'express'
import addUser from '../controllers/users.js'
const router = express.Router();

router.post('/users', addUser);
export default router