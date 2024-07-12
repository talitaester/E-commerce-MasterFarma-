'use client';

import { useRef, useState } from "react";
import "./style.css";
import Image from "next/image";
import axios from "axios";

export default function Gestao() {
    const [images, setImages] = useState<(File | null)[]>(Array(5).fill(null));
    const [previews, setPreviews] = useState<(string | undefined)[]>(Array(5).fill(undefined));
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages[index] = file;
        newPreviews[index] = file ? URL.createObjectURL(file) : undefined;
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const handleImageUpload = async () => {
        for (const image of images) {
            if (!image) continue;
            
            const formData = new FormData();
            formData.append('image', image);

            try {
                await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Image uploaded successfully');
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image');
            }
        }
    };

    return (
        <div className="pagina">
            <h1 className="pagTitulo">Gestão dos produtos</h1>
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
                                        <Image src="/little-placeholder.svg" alt="placeholder" width={80} height={80} className="little-img" />
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
                                <Image src="/placeholder.svg" alt="placeholder" width={496} height={500} className="image-placeholder" />
                            )}
                        </div>
                        <input
                            type="file"
                            ref={(el) => { fileInputRefs.current[0] = el; }}
                            style={{ display: 'none' }}
                            onChange={(e) => handleImageChange(0, e)}
                        />
                    </div>

                    <div className="forms">
                        <div className="botoes">
                            <button className="cancelar"><h6>Cancelar</h6></button>
                            <button className="confirmar" onClick={handleImageUpload}><h6>Confirmar</h6></button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
