import bcrypt from 'bcryptjs'

const users = [
	{
		username: 'Admin',
		email: 'admin@example.com',
		password: bcrypt.hashSync('admin'),
		isAdmin: true,
	},
	{
		username: 'Johny Cage',
		email: 'johny@example.com',
		password: bcrypt.hashSync('123456'),
	},
	{
		username: 'Morgan Doe',
		email: 'morgan@example.com',
		password: bcrypt.hashSync('123456'),
	},
	{
		username: 'Random Doe',
		email: 'random@example.com',
		password: bcrypt.hashSync('123456'),
	},
	{
		username: 'Alex Green',
		email: 'alex@example.com',
		password: bcrypt.hashSync('123456'),
	},
]

export default users
