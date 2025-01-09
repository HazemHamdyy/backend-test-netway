import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, 'secret-key', {
    expiresIn: '90d'
  });
};

export { signToken };
