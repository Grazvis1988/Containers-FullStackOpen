const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}


const unknownEndPoint = (request, response) => {
	response.status(404).send({ error: 'Uknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).send({ error: 'Invalid token!!!' })
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		request.token = authorization.substring(7)
		next()
	} else {
		request.token = null
		next()
	}
}

const userExtractor = (request, response, next ) => {
	const decodedToken = jwt.verify( request.token, process.env.SECRET )
	request.userId = decodedToken.id
	next()
}

module.exports = {
	requestLogger,
	unknownEndPoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
}

