import express from 'express'
import { signin ,signup} from '../controller/user.mjs'
const route_user = express.Router()
route_user.post('/signin', signin)
route_user.post('/signup', signup)

export default route_user