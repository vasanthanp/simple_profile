//NOT LIKE MODEL IN MONGODB
const sql = require("../config/database");
class User {
  user = {};
  constructor(user) {
    if (user.id) this.user.Id = user.id;
    if (user.name) this.user.name = user.name;
    if (user.email) this.user.email = user.email;
    if (user.password) this.user.password = user.password;
    if (user.contact) this.user.contact = user.contact;
    if (user.age) this.user.age = user.age;
    if (user.DOB) this.user.DOB = new Date(user.DOB);
  }
  //   createUser = async() => {
  //     try {
  //       sql.query("INSERT INTO user SET ?", this.user, (err, result) => {
  //         console.log("at line 18", err, result);
  //         if (err) {
  //           return Promise.reject({
  //             code: 500,
  //             message: "can't create user",
  //           });
  //         } else {
  //           return Promise.resolve({
  //             code: 201,
  //             message: "user created successfully",
  //           });
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       return Promise.reject({ code: 500, message: "Internal server error" });
  //     }
  //   };
}
module.exports = User;
