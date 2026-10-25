import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
   try{
const token = req.cookies.token;
if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
}
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
if(!decoded){
      return res.status(401).json({ message: "Invalid token" });
};

req.id=decoded.userId;
next();
}
catch(error){
    return res.status(500).json({ message: "Internal server error" });
   }
};

export default isAuthenticated;
const req={
   id:"",
}
req.id="sdbgnjdfn";

