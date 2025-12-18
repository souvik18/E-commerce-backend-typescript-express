import express from 'express';
import path from 'path';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;
