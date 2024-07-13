import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adicionar um produto
export const addProduct = async (name: string, code: number, price: number, oldPrice: number, category: string, images: string[] = []) => {
  return await prisma.product.create({
    data: {
      name,
      code,
      price,
      oldPrice,
      category,
      images: {
        create: images.map(url => ({ url }))
      }
    },
    include: { images: true }
  });
};

// Remover um produto
export const removeProduct = async (code: number) => {
  const product = await prisma.product.findUnique({
    where: { code },
    include: { images: true }
  });

  if (product) {
    await prisma.image.deleteMany({
      where: { productId: product.id }
    });

    return await prisma.product.delete({
      where: { code }
    });
  } else {
    throw new Error(`Produto com código ${code} não encontrado`);
  }
};

// Editar um produto
export const editProduct = async (id: number, name: string, code: number, price: number, oldPrice: number, category: string, images: string[] = []) => {
  return await prisma.product.update({
    where: { id },
    data: {
      name,
      code,
      price,
      oldPrice,
      category,
      images: {
        create: images.map(url => ({ url }))
      }
    },
    include: { images: true }
  });
};

// Pesquisar produtos por categoria
export const getProductsByCategory = async (category: string) => {
  return await prisma.product.findMany({
    where: { category },
    include: { images: true }
  });
};

// Pesquisar produtos por nome
export const getProductsByName = async (name: string) => {
  return await prisma.product.findMany({
    where: { name: { contains: name } },
    include: { images: true }
  });
};

// Pesquisar produto por código
export const getProductByCode = async (code: number) => {
  return await prisma.product.findUnique({
    where: { code },
    include: { images: true }
  });
};

// Remover imagens por índices
export const removeImagesByIndices = async (productCode: number, indices: number[]) => {
  const product = await prisma.product.findUnique({
    where: { code: productCode },
    include: { images: true }
  });

  if (!product) {
    throw new Error(`Produto com código ${productCode} não encontrado`);
  }

  const imageIdsToDelete = indices.map(index => product.images[index]?.id).filter(id => id !== undefined);

  if (imageIdsToDelete.length === 0) {
    throw new Error(`Nenhuma imagem encontrada para os índices fornecidos`);
  }

  await prisma.image.deleteMany({
    where: {
      id: {
        in: imageIdsToDelete
      }
    }
  });

  return { message: `${imageIdsToDelete.length} imagens removidas com sucesso` };
};

// Adicionar um produto ao carrinho
export const addToCart = async (productId: number) => {
  // Procurar um carrinho existente
  let cart = await prisma.cart.findFirst();

  // Se não houver carrinho, criar um
  if (!cart) {
    cart = await prisma.cart.create({
      data: {}
    });
  }

  // Verificar se o produto já está no carrinho
  const existingCartProduct = await prisma.cartProduct.findFirst({
    where: {
      cartId: cart.id,
      productId: productId
    }
  });

  // Se o produto já estiver no carrinho, aumentar a quantidade
  if (existingCartProduct) {
    return await prisma.cartProduct.update({
      where: {
        id: existingCartProduct.id
      },
      data: {
        quant: existingCartProduct.quant + 1
      },
      include: { product: true }
    });
  }

  // Adicionar o produto ao carrinho com quantidade inicial de 1
  return await prisma.cartProduct.create({
    data: {
      cartId: cart.id,
      productId: productId,
      quant: 1
    },
    include: { product: true }
  });
};

// Remover um produto do carrinho
export const removeFromCart = async (productId: number) => {
  const cart = await prisma.cart.findFirst({
    include: {
      products: true
    }
  });

  if (!cart) {
    throw new Error('Carrinho não encontrado');
  }

  return await prisma.cartProduct.deleteMany({
    where: {
      cartId: cart.id,
      productId: productId
    }
  });
};

// Verificar itens no carrinho
export const getCartItems = async () => {
  const cart = await prisma.cart.findFirst({
    include: {
      products: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart) {
    return [];
  }

  return cart.products.map(cp => ({
    ...cp.product,
    quant: cp.quant
  }));
};


// Função para atualizar a quantidade de um produto no carrinho
export const updateCartQuantity = async (cartProductId: number, newQuantity: number) => {
  return await prisma.cartProduct.update({
    where: { productId: cartProductId },
    data: { quant: newQuantity },
  });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: { images: true }
  });
};