const bcrypt = require("bcryptjs");

async function testPassword() {
  const storedHash = "$2a$10$your_hashed_password_from_database"; // Replace with the hashed password from MongoDB
  const inputPassword = "123"; // The password you’re testing
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  console.log("Password match:", isMatch);
}

testPassword();