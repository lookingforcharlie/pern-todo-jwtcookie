import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { pool } from '../db';
import authorization from '../middleware/authorization';
import validateUserInput from '../middleware/validateUserInput';
// import the function for generating token
import jwtGenerator from '../utils/jwtGenerator';

type UserType = {
  user_id: string;
  user_email: string;
  user_password: string;
};

const router = Router();

// Registering router
router.post(
  '/register',
  validateUserInput,
  async (req: Request, res: Response) => {
    try {
      // 1. destructuring req.body to get user_email and user_password
      const { email, password } = req.body;

      // 2. check if user exist (if user exist then throw error )
      const user = await pool.query(
        'SELECT * FROM users WHERE user_email = $1',
        [email]
      );
      // 401 means unauthenticated, 403 mean unauthorized ? Not really?
      if (user.rows.length > 0) {
        return res.status(401).json({ message: 'User already exists.' });
      }

      // 3. Bcrypt the user password
      const saltRound = 10;
      const salt = bcrypt.genSaltSync(saltRound);
      const bcryptPassword = bcrypt.hashSync(password, salt);

      // 4. Enter the user inside database
      const newUser = await pool.query(
        'INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *',
        [email, bcryptPassword]
      );

      // 5. Generating JWT
      const token = jwtGenerator(newUser.rows[0].user_id);

      // The cookie is called jwt.
      // maxAge in cookie is in milliseconds, different from the one in token
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      // Sending token to the client
      // res.json({ token, message: 'Signed you up successfully.' });

      res.json({ message: 'Signed you up successfully.' });
    } catch (error: unknown) {
      console.error((error as Error).message);
      res.status(500).send('Server Error');
    }
  }
);

// Login router
router.post(
  '/login',
  validateUserInput,
  async (req: Request, res: Response) => {
    try {
      // 1. Parse the req.body
      const { email, password } = req.body;

      // 2. Check if have the email in the database,
      // The simple way is using query: SELECT * FROM users WHERE user_email = 'bino@gmail.com';
      const existedUser = await pool.query(
        'SELECT * FROM users WHERE user_email = $1',
        [email]
      );

      // throw error if user doesn't exit
      if (existedUser.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid Credential' });
      }

      // res.json(existedUser.rows[0].user_password);

      // 3. Check if password is correct, throw error if password is wrong
      const validPassword = await bcrypt.compare(
        password,
        existedUser.rows[0].user_password
      );

      // const validPassword =
      //   password === existedUser.rows[0].user_password ? true : false;

      console.log('Is password valid? ', validPassword);

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid Credential' });
      }

      // 4. Grant authenticated user JWT token
      const token = jwtGenerator(existedUser.rows[0].user_id);

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      console.log(token);

      // Sending token to the client
      // res.json({ token });

      res.json({
        message:
          'Logged in successfully. do you see the cookie in Application?',
      });

      // res.json(res);
    } catch (error: unknown) {
      console.error((error as Error).message);
      res.status(500).send('Server Error');
    }
  }
);

// The Client side constantly check this router to verify users
router.get('/is-verify', authorization, (req: Request, res: Response) => {
  try {
    // return back a true statement, if the token is valid
    res.json(true);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send('Server Error');
  }
});

// Clients call this api to delete cookie and logout
router.get('/logout', (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt', { httpOnly: true });
    res.json(true);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send('Server Error');
  }
});

export default router;

// SELECT EXISTS (SELECT 1 FROM users WHERE user_email = $1) AS email_exists
// The query to check if an user's email exists in user table in the database
// The query below will contain a boolean variable called email_exists
// you can retrieve it by  console.log(dataReturned.rows[0].email_exists);

// res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
