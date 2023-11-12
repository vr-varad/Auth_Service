const UserRepository = require('../repositories/user-repositories')

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
}

module.exports = UserService