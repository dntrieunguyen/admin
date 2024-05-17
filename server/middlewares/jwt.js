import jwt from 'jsonwebtoken';

const generateAccessToken = (id, role) => {
   jwt.sign({ id, role }, process.env.SECRET, { expires: '3d' });
};

const verifyAccessToken = (req, res) => {};

export { generateAccessToken };
