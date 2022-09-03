const users = require("../mock/users");

const findUser = (userName, userPass) => {
  const vaildUser = users.filter((item) => {
    return item.username === userName && item.password === userPass;
  });
  return vaildUser.length > 0 ? true : false;
};

module.exports = findUser;
