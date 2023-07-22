import { Request, Response, Router } from 'express';
import { pool } from '../db';
import authorization, { CustomRequest } from '../middleware/authorization';

const router = Router();

router.get('/', authorization, async (req: CustomRequest, res: Response) => {
  try {
    // The middleware authorization will create req.user which contains only user_id
    // You will see user_id by res.json(req.user);
    const user = await pool.query(
      'SELECT user_email FROM users WHERE user_id = $1',
      [req.user]
    );

    // Now we get the user_email
    // Caveat: don't get the everything like password from the database
    res.json(user.rows[0]);
  } catch (error: unknown) {
    console.error((error as Error).message);
    res.status(500).json('Server Error');
  }
});

export default router;

// Let Header component to get the use_email to show on the Navbar
