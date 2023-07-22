import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { pool } from './db';
import header from './routes/header';
import jwtAuth from './routes/jwtAuth';

config();
const app = express();
const PORT = (process.env.PORT || 3001) as number;

// Must use this corsOption, otherwise cookie won't show in Application Panel, can't just use(cors()). But why ?
const corsOption = {
  // 'origin: true': allow requests from any origin dynamically without explicitly specifying the origin.
  origin: true,
  // 'Access-Control-Allow-Credentials' header set to true
  credentials: true,
};

app.use(cors(corsOption));
app.use(morgan('tiny'));

// The only way we can get data from frontend is accessing the object of 'req.body'
// express.json() gives us the access of body
app.use(express.json());

async function startServer() {
  try {
    // Connect to the database
    await pool.connect();
    console.log('Connected to the database!');

    // Start listening to the port
    app.listen(PORT, (err?: Error) => {
      ``;
      if (err) {
        return console.log('The error for listening the port:', err);
      }
      console.log(`Server is successfully listening to ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Building routes for Login
app.use('/auth', jwtAuth);

// Building routes for accessing header
app.use('/header', header);

// ---------------------------------------------------------------------
// Building the routes for todo function
// Get all todos
app.get('/todos', async (req: Request, res: Response) => {
  try {
    // The reason we don't use RETURNING, cos it only works with insert, update, and delete
    // when you use the SELECT, naturally it will get the data back
    const allTodos = await pool.query('SELECT * FROM todo');
    // let's reverse todo
    const reversedAllTodos = allTodos.rows.reverse();
    res.json(reversedAllTodos);
  } catch (Error) {
    console.log(Error);
  }
});

// Get a specific todo
app.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const todo = await pool.query(`SELECT * FROM todo WHERE todo_id=${id}`);
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id=$1', [id]);
    res.json(todo.rows);
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
});

// Create a todo
app.post('/todos', async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    // $1 is a placeholder allows me to define what it equals to, which is description retrieved from frontend
    // need RETURNING here, otherwise
    await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
      description,
    ]);
    // res.json(newTodo);
    // res.json(newTodo.rows);

    // return the whole to_do items after creating a new todo item
    // reverse the array, always keep the new added at the front
    const updateTodo = await pool.query('SELECT * FROM todo');
    const reversedUpdateTodo = updateTodo.rows.reverse();
    res.json(reversedUpdateTodo);
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
});

// Update a todo, use set
app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    // Use id for WHERE in query
    const { id } = req.params;
    // Use description for SET in query
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = ($1) WHERE todo_id = ($2) RETURNING *',
      [description, id]
    );
    // return the modified todo item
    res.json(updateTodo.rows);
    // res.json('Todo was updated successfully');
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
});

// Delete a todo
app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    // Use id for WHERE in query
    const { id } = req.params;
    await pool.query('DELETE FROM todo WHERE todo_id = ($1)', [id]);

    // return the whole to_do items after deletion
    // reverse the array, always keep the new added at the front
    const updateTodo = await pool.query('SELECT * FROM todo');
    const reversedUpdateTodo = updateTodo.rows.reverse();
    res.json(reversedUpdateTodo);
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
});

startServer();
