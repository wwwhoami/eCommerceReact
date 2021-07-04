import redis from 'redis'
import { promisify } from 'util'

const redisClient = redis.createClient(
	parseInt(process.env.REDIS_PORT || '6379'),
	process.env.REDIS_HOST || '127.0.0.1'
)

export const getAsync = promisify(redisClient.get).bind(redisClient)

redisClient.on('connect', () => {
	console.log('Connected to Redis')
})

export default redisClient
