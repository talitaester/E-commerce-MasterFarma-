'use client';

import { useEffect, useRef, useState } from "react";
import "./style.css";
import Image from "next/image";
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

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
            setImageUrls(prev => [...prev, imageUrl]); // Adiciona o URL à lista de URLs
            setImageUrl(""); // Limpa o input de URL
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
                id: Date.now(), // ID temporário
                name: productName,
                oldPrice: parseFloat(oldPrice),
                price: parseFloat(price),
                code: parseInt(code),
                category: categories.join(', '),
                images: newProductImages, // Passa o array de strings diretamente
                quant: 1,
            };
    
            // Log dos dados do novo produto antes de enviar
            console.log('Enviando dados do produto:', newProduct);
    
            const response = await axios.post('http://localhost:8080/products', newProduct, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const createdProduct = response.data;
    
            alert('Produto criado com sucesso');
            setProducts(prev => [...prev, createdProduct]); // Atualiza a lista de produtos com o produto criado retornado pelo servidor
            setProductName("");
            setOldPrice("");
            setPrice("");
            setCode("");
            setCategories([]);
            setImages(Array(5).fill(null));
            setPreviews(Array(5).fill(undefined));
            setImageUrls([]);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            alert('Falha ao criar produto');
        }
    };
    
    
    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategories(prevCategories =>
            e.target.checked ? [...prevCategories, value] : prevCategories.filter(category => category !== value)
        );
    };

    const handleDeleteProduct = async (code: number) => {
        try {
            const response = await axios.delete(`http://localhost:8080/products/${code}`);
            console.log(`Deleted product with code ${code}`);
            setProducts(prevProducts => prevProducts.filter(product => product.code !== code));
        } catch (error) {
            console.error(`Error deleting product with code ${code}:`, error);
        }
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
                <h4 className="containerTitulo">Criar Produto</h4>
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
                                    <input type="checkbox" name="category" value="medicamentos" onChange={handleCategoryChange} />
                                    Medicamentos
                                </label>
                                <label className="input">
                                    <input type="checkbox" name="category" value="suplementos" onChange={handleCategoryChange} />
                                    Suplementos
                                </label>
                                <label className="input">
                                    <input type="checkbox" name="category" value="higiene" onChange={handleCategoryChange} />
                                    Higiene
                                </label>
                                <label className="input">
                                    <input type="checkbox" name="category" value="beleza" onChange={handleCategoryChange} />
                                    Beleza
                                </label>
                                <label className="input">
                                    <input type="checkbox" name="category" value="bebes" onChange={handleCategoryChange} />
                                    Bebês
                                </label>
                                <label className="input">
                                    <input type="checkbox" name="category" value="saude" onChange={handleCategoryChange} />
                                    Saúde
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl"><h6>URL da imagem</h6></label>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    placeholder="Insira o URL da imagem"
                                    value={imageUrl}
                                    onChange={handleImageUrlChange}
                                    className="price-input"
                                />
                                <button type="button" onClick={handleAddImageUrl} className="check-button">
                                    Adicionar
                                </button>
                            </div>
                        </div>
                        <div className="botoes">
                            <button className="cancelar" onClick={() => setIsMenuVisible(false)}><h6>Cancelar</h6></button>
                            <button className="confirmar" onClick={handleImageUpload}><h6>Confirmar</h6></button>
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
                    />
                ))}
            </div>
        </div>
    );
}