const bcrypt = require("bcrypt");

const password = "user1234";
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Encrypted password:", hash);
});
