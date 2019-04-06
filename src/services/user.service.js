class UserService {

  id = null;
  name = null;
  email = null;
  userType = null;

  setData(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.userType = userData.userType;
  }

  getData() {
    return {
      ...this
    }
  }
}

const userService = new UserService();

export default userService;
