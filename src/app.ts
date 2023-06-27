import express from 'express';
import productsRouter from './routers/products.router';
import ordersRouter from './routers/orders.router';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;
