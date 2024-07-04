import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adicionar um produto
export const addProduct = async (name: string, code: number, price: number, category: string) => {
  return await prisma.product.create({
    data: {
      name,
      code,
      price,
      category
    }
  });
};

// Remover um produto
export const removeProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id }
  });
};

// Editar um produto
export const editProduct = async (id: number, name: string, code: number, price: number, category: string) => {
  return await prisma.product.update({
    where: { id },
    data: {
      name,
      code,
      price,
      category
    }
  });
};

// Pesquisar produtos por categoria
export const getProductsByCategory = async (category: string) => {
  return await prisma.product.findMany({
    where: { category }
  });
};

// Pesquisar produtos por nome
export const getProductsByName = async (name: string) => {
  return await prisma.product.findMany({
    where: { name: { contains: name } }
  });
};

// Pesquisar produto por código
export const getProductByCode = async (code: number) => {
  return await prisma.product.findUnique({
    where: { code }
  });
};
