// Mock Role
const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
};

// Mock User
const users = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    role: ROLE.ADMIN,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "tester",
    email: "tester@gmail.com",
    password: "tester",
    role: ROLE.BASIC,
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "fakeuser",
    email: "fakeuser@gmail.com",
    password: "fakeuser",
    role: ROLE.BASIC,
  },
];

module.exports = users;
