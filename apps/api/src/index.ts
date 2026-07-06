import express from 'express';
import cors from 'cors';
import { prisma } from './db';
import uploadRouter from './routes/upload';
import authRouter, { authMiddleware } from './routes/auth';
import ordersRouter from './routes/orders';
import adminRouter from './routes/admin';

const app = express();
const PORT = process.env.PORT || 3020;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Public settings endpoint (no auth required) — used by storefront for video URL etc.
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const obj: Record<string, string> = {};
    for (const s of settings) {
      obj[s.key] = s.value;
    }
    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Fetch all products for the storefront
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Authentication Routes
app.use('/api/auth', authRouter);

// Public Order Creation Route
app.use('/api/orders', ordersRouter);

// Admin Routes (Protected)
app.use('/api/admin', authMiddleware, adminRouter);

// AWS S3 Upload Route (Protected)
app.use('/api/upload', authMiddleware, uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
