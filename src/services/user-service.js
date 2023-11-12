const UserRepository = require('../repositories/user-repositories')
const jwt = require('jsonwebtoken');

const { JWT_KEY } = require('../config/serverConfig')

class UserService{
  constructor(){
    this.userRepository = new UserRepository()
  }
  async create(data){
    try {
      const user = await this.userRepository.create(data)      
      return user
    } catch (error) {
      console.log('Something went wrong in user service layer')
      throw error
    }
  }
  async getById(userId){
    try {
      const user = await this.userRepository.getById(userId)      
      return user
    } catch (error) {
      console.log('Something went wrong in user service layer')
      throw error
    }
  }

  createToken(data){
    try {
      const token = jwt.sign(data,JWT_KEY,{ expiresIn: '1h' })
      return token
    } catch (error) {
      console.log('Something went wrong in the token creation', error)
      throw error
    }
  }
  verifyToken(token){
    try {
      const response = jwt.verify(token,JWT_KEY)
      return response
    } catch (error) {
      console.log('Something went wrong in the token validation', error)
      throw error
    }
  }
}

module.exports = UserService