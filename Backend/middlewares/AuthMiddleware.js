import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies.jwt;
    // console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User Not Authanticated",
      });
    }

    const tokenData = await jwt.verify(token, process.env.JWT_KEY);
    if (!tokenData) {
      return res.status(403).json({
        success: false,
        message: "token invalid",
      });
    }

    // console.log(tokenData);
    req.userId = tokenData.userId;
    
    next();
  } catch (error) {
    console.log(error);
  }
};
