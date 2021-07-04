import redis from 'redis'

const redisClient = redis.createClient(
	parseInt(process.env.REDIS_PORT || '6379'),
	process.env.REDIS_HOST || '127.0.0.1'
)

redisClient.on('connect', () => {
	console.log('Connected to Redis')
})

export default redisClient
