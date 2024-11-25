const createUser = async () => {
  return {
    id: 3,
    name: "Charlie",
  }
};

const getUsers = async () => {
  return [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
};

module.exports = {
    getUsers,
    createUser
}
