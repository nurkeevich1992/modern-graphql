import jwt from 'jsonwebtoken';

const generateToken = userId => jwt.sign({ userId }, 'thisisasecret', { expiresIn: '1 day' });

export { generateToken as default };
