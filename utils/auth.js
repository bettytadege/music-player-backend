const jwt = require("jsonwebtoken");
const { promisify } = require("util");
//sign
exports.signToken = (id, role) => {
  const payload = {
    id, // Extracting the nested id
    role // Extracting the nested role
  };
  return jwt.sign(
    payload,
    process.env.SERCERT_KEY,
    { expiresIn: process.env.EXPIRESIN }
  );

  // return token
};

exports.getuser = async(token) => {
    
  try {
    
    decoded =await jwt.verify(token, process.env.SERCERT_KEY);
  //  console.log('decoded id',decoded);
  //  console.log('decoded id',decoded.id);
    if (decoded.id) {
      return decoded.id;
    }
  } catch (error) {
    // console.log("error");
    // console.log(error);
    return null;
  }
};
