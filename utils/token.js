const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const SECRET_KEY = "hh99-secret-key";

createAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "10s" });

  return accessToken;
};

createRefreshToken = () => {
  const refreshToken = jwt.sign({}, SECRET_KEY, { expiresIn: "7d" });

  return refreshToken;
};

validateAccessToken = (accessToken) => {
  try {
    jwt.verify(accessToken, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

validateRefreshToken = (refreshToken) => {
  try {
    jwt.verify(refreshToken, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

getAccessTokenPayload = (accessToken) => {
  try {
    const payload = jwt.verify(accessToken, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
};
