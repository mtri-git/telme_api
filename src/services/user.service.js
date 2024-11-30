const bcrypt = require('bcrypt')
const Users = require('../models/user.model');
const { successResponse } = require('../utils/response');

const createUser = async () => {
  return {
    id: 3,
    name: "Charlie",
  }
};

const getUsers = async (data) => {
  const { limit, page, name } = data;

  const queryParams = {
    deleted_at: null,
  };

  if (name) {
    queryParams.fullname = { $regex: name, $options: 'i' };
  }
  
  const users = await Users.find(
    queryParams,
    { password: 0, __v: 0 }
  ).limit(limit)
  .skip(limit * (page - 1))
  .sort({ created_at: -1 });

  return successResponse('Get users success', users);
};

const registerUser = async (data) => {
  const { email, password, username, fullname } = data;

  // crypto password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new Users({
    email,
    password: hash,
    username,
    fullname,
  });

  await user.save();

  // remove password
  user.password = undefined;

  return successResponse('Register user success', user);
}

const getUserInfo = async (data) => {
  const { id } = data;

  const user = await Users.findById(id, { password: 0, __v: 0 });
  return successResponse('Get user info success', user);
}

const getUserById = async (id) => {
  const user = await Users.findOne({
    _id: id,
    deleted_at: null,
  });

  return user
}

module.exports = {
    getUsers,
    createUser,
    registerUser,
    getUserInfo,
    getUserByEmail: getUserById
}
