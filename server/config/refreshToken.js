import jwt from 'jsonwebtoken'

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '90d' })
}

export default generateRefreshToken
