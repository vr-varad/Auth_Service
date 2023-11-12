const UserRepository = require('../repositories/user-repositories')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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

  async signIn(email, plainPassword){
    try {
      //step-1
      const user = await this.userRepository.getByEmail(email)
      //step-2
      const passwordMatch = await this.checkPassword(plainPassword,user.password)
      //step-3
      if(!passwordMatch){
        console.log('Incorrect Password')
        throw {error : 'Incorrect Password'}
      }
      const jwtToken = await this.createToken({email: user.email, id: user.id})
      return jwtToken
    } catch (error) {
      console.log('Something went wrong in the sign in process')
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
  checkPassword(userPlainPassword,encryptedPassword){
    try {
      return bcrypt.compareSync(userPlainPassword,encryptedPassword)
    } catch (error) {
      console.log('Something went wrong in the password comparison')
      throw error
    }
  }
}

module.exports = UserService