'use client';

import { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import Produto from "../components/Produto/Produto";
import Pesquisa from "../pesquisa/page";

interface ProdutoType {
    category: string;
    code: number;
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    images: { url: string }[];
    quant: number;
}

export default function Gestao() {
    const [products, setProducts] = useState<ProdutoType[]>([]);
    const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [previews, setPreviews] = useState<(string | undefined)[]>(Array(5).fill(undefined));
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));
    
    const [productName, setProductName] = useState("");
    const [oldPrice, setOldPrice] = useState("");
    const [price, setPrice] = useState("");
    const [code, setCode] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchProductsByCategory = async (category: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/products?category=${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
    };

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages[index] = file;
        newPreviews[index] = file ? URL.createObjectURL(file) : undefined;
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    const handleAddImageUrl = () => {
        if (imageUrl) {
            setPreviews(prev => {
                const newPreviews = [...prev];
                const emptyIndex = newPreviews.findIndex(preview => preview === undefined);
                if (emptyIndex !== -1) {
                    newPreviews[emptyIndex] = imageUrl;
                }
                return newPreviews;
            });
            setImageUrls(prev => [...prev, imageUrl]);
            setImageUrl("");
        }
    };

    const handleImageUpload = async () => {
        try {
            const uploadedImages = [];
            for (const image of images) {
                if (!image) continue;

                const formData = new FormData();
                formData.append('image', image);

                const response = await axios.post('http://localhost:8080/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    uploadedImages.push(response.data.url);
                } else {
                    throw new Error('Erro ao carregar imagem');
                }
            }

            const newProductImages = [
                ...uploadedImages,
                ...imageUrls,
            ];

            const newProduct = {
                id: editingProductId || Date.now(), // Usa o ID do produto sendo editado ou gera um novo
                name: productName,
                oldPrice: parseFloat(oldPrice),
                price: parseFloat(price),
                code: parseInt(code),
                category: categories.join(', '),
                images: newProductImages,
                quant: 1,
            };

            if (editingProductId) {
                await axios.put(`http://localhost:8080/products/${editingProductId}`, newProduct);
                alert('Produto atualizado com sucesso');
                fetchProducts(); // Atualiza a lista de produtos após edição
            } else {
                const response = await axios.post('http://localhost:8080/products', newProduct, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const createdProduct = response.data;
                alert('Produto criado com sucesso');
                setProducts(prev => [...prev, createdProduct]);
            }

            resetForm();
        } catch (error) {
            console.error('Erro ao criar ou atualizar produto:', error);
            alert('Falha ao criar ou atualizar produto');
        }
    };

    const resetForm = () => {
        setProductName("");
        setOldPrice("");
        setPrice("");
        setCode("");
        setCategories([]);
        setImages(Array(5).fill(null));
        setPreviews(Array(5).fill(undefined));
        setImageUrls([]);
        setEditingProductId(null);
        setIsMenuVisible(false);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.checked) {
            setCategories(prevCategories => [...prevCategories, value]);
            fetchProductsByCategory(value); // Filtra por categoria selecionada
        } else {
            setCategories(prevCategories => prevCategories.filter(category => category !== value));
            fetchProducts(); // Recarrega todos os produtos
        }
    };

    const handleDeleteProduct = async (code: number) => {
        try {
            await axios.delete(`http://localhost:8080/products/${code}`);
            setProducts(prevProducts => prevProducts.filter(product => product.code !== code));
        } catch (error) {
            console.error(`Error deleting product with code ${code}:`, error);
        }
    };

    const handleEditProduct = (product: ProdutoType) => {
        setProductName(product.name);
        setOldPrice(product.oldPrice.toString());
        setPrice(product.price.toString());
        setCode(product.code.toString());
        setImageUrls(product.images.map(img => img.url));
        setPreviews(product.images.map(img => img.url));
        setCategories(product.category.split(', ').filter(Boolean)); // Preenche categorias
        setEditingProductId(product.id); // Armazena ID do produto sendo editado
        setIsMenuVisible(true); // Mostra o formulário de adicionar produto
    };

    return (
        <div className="pagina">
            <h1 className="pagTitulo">Gestão dos produtos</h1>
            {!isMenuVisible && (
                <button className="adicionar-produto" onClick={() => setIsMenuVisible(true)}>
                    <h1 className="botaoTitulo">Adicionar Produto</h1>
                </button>
            )}
            {isMenuVisible && (
                <div className="menuCriacao">
                    <h4 className="containerTitulo">{editingProductId ? 'Editar Produto' : 'Criar Produto'}</h4>
                    <div className="content">
                        <div className="images-container">
                            <div className="line">
                                {Array(4).fill(null).map((_, i) => (
                                    <div key={i + 1} className="little-container" onClick={() => fileInputRefs.current[i + 1]?.click()}>
                                        {previews[i + 1] ? (
                                            <img src={previews[i + 1]} alt="Preview" className="little-image-preview" />
                                        ) : (
                                            <img src="/little-placeholder.svg" alt="placeholder" width={80} height={80} className="little-img" />
                                        )}
                                        <input
                                            type="file"
                                            ref={(el) => { fileInputRefs.current[i + 1] = el; }}
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleImageChange(i + 1, e)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="image-upload-container" onClick={() => fileInputRefs.current[0]?.click()}>
                                {previews[0] ? (
                                    <img src={previews[0]} alt="Preview" className="image-preview" />
                                ) : (
                                    <img src="/placeholder.svg" alt="placeholder" width={496} height={500} className="image-placeholder" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={(el) => { fileInputRefs.current[0] = el; }}
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageChange(0, e)}
                            />
                        </div>
                        <div className="product-form">
                            <div className="form-group">
                                <label htmlFor="productName"><h6>Nome do produto</h6></label>
                                <input type="text" id="productName" placeholder="Nome do produto" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="prices">
                                <div className="price-input">
                                    <label htmlFor="oldPrice"><h6>Preço antigo</h6></label>
                                    <input type="text" id="oldPrice" placeholder="R$0,00" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
                                </div>
                                <div className="price-input">
                                    <label htmlFor="price"><h6>Preço atual</h6></label>
                                    <input type="text" id="price" placeholder="R$0,00" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="code"><h6>Código</h6></label>
                                <input type="text" id="code" placeholder="00000000" value={code} onChange={(e) => setCode(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label><h6>Categoria</h6></label>
                                <div className="checkbox-group">
                                    <label className="input">
                                        <input type="checkbox" name="category" value="medicamentos" checked={categories.includes('medicamentos')} onChange={handleCategoryChange} />
                                        Medicamentos
                                    </label>
                                    <label className="input">
                                        <input type="checkbox" name="category" value="suplementos" checked={categories.includes('suplementos')} onChange={handleCategoryChange} />
                                        Suplementos
                                    </label>
                                    <label className="input">
                                        <input type="checkbox" name="category" value="higiene" checked={categories.includes('higiene')} onChange={handleCategoryChange} />
                                        Higiene
                                    </label>
                                    <label className="input">
                                        <input type="checkbox" name="category" value="beleza" checked={categories.includes('beleza')} onChange={handleCategoryChange} />
                                        Beleza
                                    </label>
                                    <label className="input">
                                        <input type="checkbox" name="category" value="bebes" checked={categories.includes('bebes')} onChange={handleCategoryChange} />
                                        Bebês
                                    </label>
                                    <label className="input">
                                        <input type="checkbox" name="category" value="saude" checked={categories.includes('saude')} onChange={handleCategoryChange} />
                                        Saúde
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="imageUrl"><h6>URL da imagem</h6></label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        id="imageUrl"
                                        placeholder="Insira o URL da imagem"
                                        value={imageUrl}
                                        onChange={handleImageUrlChange}
                                    />
                                    <button type="button" onClick={handleAddImageUrl} className="check-button" style={{ color: '#EBFFFE', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                        adicionar
                                    </button>
                                </div>
                            </div>
                            <div className="botoes">
                                <button className="cancelar" onClick={resetForm}><h6>Cancelar</h6></button>
                                <button className="confirmar" onClick={handleImageUpload}><h6>{editingProductId ? 'Atualizar' : 'Confirmar'}</h6></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="produtosListados">
                {!isMenuVisible && (
                    <div className="pesquisa">
                    <Pesquisa />
                    </div>
                )}
                {products.map((product) => (
                    <Produto
                        key={product.id}
                        nome={product.name}
                        precoAntigo={`R$${product.oldPrice}`}
                        precoAtual={`R$${product.price}`}
                        parcelas={`Ou 3x de R$${(product.price / 3).toFixed(2)}`}
                        imagemSrc={product.images[0]?.url || '/produto.png'}
                        editable={true}
                        code={product.code}
                        onDelete={() => handleDeleteProduct(product.code)}
                        onEdit={() => handleEditProduct(product)} // Chama a função de edição
                    />
                ))}
            </div>
        </div>
    );
}
