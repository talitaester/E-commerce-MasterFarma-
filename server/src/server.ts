import express, { Request, Response } from 'express';
import cors from 'cors';
import {filterProductsByMaxPrice, getAllProducts, updateCartQuantity, addProduct, removeProduct, editProduct, getProductsByCategory, getProductsByName, getProductByCode, removeImagesByIndices, addToCart, removeFromCart, getCartItems, getProductsByCategories } from './services';
import { Product } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', // Permitir apenas esse domínio
  credentials: true // Permitir cookies e credenciais
}));


// Rota para buscar todos os produtos
app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para adicionar um produto
app.post('/products', async (req: Request, res: Response) => {
  const { name, code, price, oldPrice, category, images } = req.body;
  try {
    const product = await addProduct(name, code, price, oldPrice, category, images);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para remover um produto por código
app.delete('/products/code/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    await removeProduct(Number(code));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para editar um produto
// essa rota nao permite excluir imagens relacionadas a um produto, apenas adicionar
// caso seja preciso excluir alguma imagens, use a rota para excluir imagem por indice 
app.put('/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, price, oldPrice, category, images } = req.body;
  try {
    const product = await editProduct(Number(id), name, code, price, oldPrice, category, images);
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

// Rota para remover imagens por índices
app.delete('/products/:productCode/images', async (req: Request, res: Response) => {
  const { productCode } = req.params;
  const { indices } = req.body; // Expecting an array of indices in the body
  try {
    const result = await removeImagesByIndices(Number(productCode), indices);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para adicionar um produto ao carrinho
app.post('/cart', async (req: Request, res: Response) => {
  const { productId } = req.body;
  try {
    const cartItem = await addToCart(productId);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para remover um produto do carrinho
app.delete('/cart/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    await removeFromCart(Number(productId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para verificar itens no carrinho
app.get('/cart', async (req: Request, res: Response) => {
  try {
    const cartItems = await getCartItems();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Rota para atualizar a quantidade de um produto no carrinho
app.put('/cart/:cartProductId/quantity', async (req: Request, res: Response) => {
  const { cartProductId } = req.params;
  const { quant } = req.body;

  try {
    const updatedCartProduct = await updateCartQuantity(Number(cartProductId), quant);
    res.status(200).json(updatedCartProduct);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
})

// Rota para filtrar produtos por preço máximo
app.get('/products/filter', async (req: Request, res: Response) => {
  const { categories, minPrice, maxPrice } = req.query;

  try {
    let products;

    if (categories) {
      const categoryArray = (categories as string).split(',');
      products = await getProductsByCategories(categoryArray);
    } else {
      products = await getAllProducts(); // Or any other method to get all products
    }

    if (minPrice || maxPrice) {
      const min = parseFloat(minPrice as string) || 0;
      const max = parseFloat(maxPrice as string) || Infinity;

      products = products.filter((product: Product) =>
        product.price >= min && product.price <= max
      );
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});





// Iniciar o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
