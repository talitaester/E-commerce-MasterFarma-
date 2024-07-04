import express, { Request, Response } from 'express';
import cors from 'cors';
import { addProduct, removeProduct, editProduct, getProductsByCategory, getProductsByName, getProductByCode } from './services';

const app = express();
app.use(express.json());
app.use(cors());

// Rota para adicionar um produto
app.post('/products', async (req: Request, res: Response) => {
  const { name, code, price, category } = req.body;
  try {
    const product = await addProduct(name, code, price, category);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para remover um produto
app.delete('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await removeProduct(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para editar um produto
app.put('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, price, category } = req.body;
  try {
    const product = await editProduct(Number(id), name, code, price, category);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para pesquisar produtos por categoria
app.get('/products/category/:category', async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const products = await getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para pesquisar produtos por nome
app.get('/products/name/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const products = await getProductsByName(name);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para pesquisar produto por código
app.get('/products/code/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const product = await getProductByCode(Number(code));
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
