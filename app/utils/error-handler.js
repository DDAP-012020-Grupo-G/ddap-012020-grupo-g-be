module.exports = errorHandler

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    res.status(400).json({ message: err })
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    res.status(400).json({ message: err.message })
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    res.status(401).json({ message: 'Token inválido' })
  }

  if (err.name === 'CastError') {
    // jwt authentication error
    res.status(404).json({ message: 'No se ha encontrado el objeto solicitado' })
  }

  // default to 500 server error
  if (!res.statusCode) 
    res.status(500).json({ message: err.message })
}
