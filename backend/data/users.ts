import bcrypt from 'bcryptjs'
import { User } from '../types'

const users: User[] = [
	{
		name: 'Admin',
		email: 'admin@example.com',
		password: bcrypt.hashSync('admin'),
		isAdmin: true,
	},
	{
		name: 'Johny Cage',
		email: 'johny@example.com',
		password: bcrypt.hashSync('123456'),
	},
	{
		name: 'Morgan Doe',
		email: 'morgan@example.com',
		password: bcrypt.hashSync('123456'),
	},
	{
		name: 'Random Doe',
		email: 'random@example.com',
		password: bcrypt.hashSync('123456'),
	},
	{
		name: 'Alex Green',
		email: 'alex@example.com',
		password: bcrypt.hashSync('123456'),
	},
]

export default users