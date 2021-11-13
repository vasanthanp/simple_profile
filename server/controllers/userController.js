const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const { v4: UUID } = require("uuid");
const sql = require("../config/database");
const User = require("../models/user");
const signupController = (req, res) => {
  try {
    const user = req.body;
    const { email, password } = user;
    let stm = "SELECT * FROM ?? WHERE ?? = ?";
    const values = ["user", "email", email];
    stm = mysql.format(stm, values);
    sql.query(stm, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: `Can't create user` });
      } else if (result.length > 0) {
        return res.status(403).json({
          success: false,
          message: `user with email ${email} already exist's`,
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(password, salt);
        const new_user = new User({ ...user, password: hashed, id: UUID() });
        console.log(new_user.user);
        sql.query("INSERT INTO user SET ? ", new_user.user, (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: `can't create user` });
          res
            .status(201)
            .json({ success: true, message: `user created successfully` });
        });
      }
    });
  } catch (err) {
    console.log(`error on creating user,${err}`);
    res.status(500).json({ success: false, message: "Error on creating user" });
  }
};
const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let stm = "SELECT * FROM ?? WHERE ?? = ?";
    const values = ["user", "email", email];
    stm = mysql.format(stm, values);
    sql.query(stm, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: `Can't get user` });
      } else if (result.length < 1) {
        return res.status(403).json({
          success: false,
          message: `user with email ${email} not exist's`,
        });
      } else {
        bcrypt.compare(password, result[0].password, (err, success) => {
          delete result[0].password;
          if (err)
            return res.status(500).json({
              success: false,
              message: `Internal server error on getting user`,
            });
          if (!success)
            return res
              .status(401)
              .json({ success: false, message: `Invalid credentails` });
          res
            .status(200)
            .json({ success: true, message: "user found", user: result[0] });
        });
      }
    });
  } catch (err) {
    console.log(`error on sigin in,${err}`);
    res.status(500).json({ success: false, message: "Error on singin" });
  }
};
const getUserController = async (req, res) => {
  try {
    const { user_id } = req.body;
    let stm = `SELECT * FROM ?? WHERE ?? = ?`;
    const values = ["user", "id", user_id];
    stm = mysql.format(stm, values);
    sql.query(stm, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error on getting user" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ message: `user with given id not found` });
      }
      delete result[0].password;
      res
        .status(200)
        .json({ success: true, message: `user found`, user: result[0] });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error in getting user" });
  }
};
const updateUserController = async (req, res) => {
  try {
    const user = req.body;
    const { id } = user;
    let stm = `SELECT * FROM ?? WHERE ?? = ?`;
    let values = ["user", "id", id];
    stm = mysql.format(stm, values);
    sql.query(stm, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error on updating user" });
      }
      if (!result.length) {
        return res
          .status(404)
          .json({ success: false, message: `user with given id not found` });
      }
      if (user.email) {
        stm = `SELECT ?? FROM ?? WHERE ?? = ?`;
        values = ["id", "user", "email", user.email];
        stm = mysql.format(stm, values);
        sql.query(stm, (err, result) => {
          if (result[0].id !== id) {
            return res.status(403).json({
              success: false,
              message: `new email given by you was already taken`,
            });
          }
        });
      }
      const new_user = new User({ ...user });
      delete new_user.user.Id;
      stm = `UPDATE user SET  ${Object.keys(new_user.user)
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE id = ?`;
      console.log(stm);
      values = [...Object.values(new_user.user), user.id];
      stm = mysql.format(stm, values);
      sql.query(stm, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: `Error on updating user` });
        }
        if (result.affectedRows == 0) {
          return res
            .status(404)
            .json({ success: false, message: `User with given id not found` });
        }
        res
          .status(201)
          .json({ success: true, message: `user updated successfully` });
      });
    });
  } catch (err) {
    res.status(500).json({ message: `Error on updating user` });
  }
};

module.exports = {
  signinController,
  signupController,
  getUserController,
  updateUserController,
};
