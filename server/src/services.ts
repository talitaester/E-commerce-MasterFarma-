import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adicionar um produto
export const addProduct = async (name: string, code: number, price: number, oldPrice: number, category: string, images: string[]) => {
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
export const editProduct = async (id: number, name: string, code: number, price: number, oldPrice: number, category: string, images: string[]) => {
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
// Nesse caso é usado o indice na imagen no array de imagens
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
