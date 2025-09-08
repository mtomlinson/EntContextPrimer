import express from 'express';
import cors from 'cors';
import companyRouter from './routes/company';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/company', companyRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Enterprise Context Primer API is running!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
