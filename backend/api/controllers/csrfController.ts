import { Request, Response } from 'express'

/**
 * @desc   Get csrf token
 * @route  GET /api/csrf-token
 * @access PUBLIC
 */
export const getCsrfToken = (req: Request, res: Response) => {
	res.json({ csrfToken: req.csrfToken() })
}
