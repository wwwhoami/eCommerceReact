import { sign } from 'jsonwebtoken'

export const generateToken = (id: string) => {
	return sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
		expiresIn: '1h',
	})
}
