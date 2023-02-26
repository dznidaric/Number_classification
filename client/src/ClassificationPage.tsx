import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classificationService from "./services/classificationService";

function ClassificationPage() {

    const navigate = useNavigate();

    interface ImageProps {
        name: string;
        src: string;
    }

    const images: ImageProps[] = [
        { name: "Number 0", src: require(".//lib/images/0.png") },
        { name: "Number 4", src: require(".//lib/images/4.png") },
        { name: "Number 5", src: require(".//lib/images/5.png") },
    ];

    const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

    const [classifiedNumber, setClassifiedNumber] = useState<number>();

    const handleImageClick = (image: ImageProps) => {
        setSelectedImage(image);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedImage) {
            return;
        }

        const formData = new FormData();
        const file = await fetch(selectedImage.src).then((res) => res.blob());
        formData.append("image", file, selectedImage.name);
        classificationService.uploadImage(formData).then((data) => {
            console.log("Image uploaded successfully", data);
            setClassifiedNumber(data);
        }).catch((error) => {
            console.error("Error uploading image", error);
        });
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    }


    return (
        <>
            <h2 style={{ "textAlign": "center" }}>Number Classification App</h2>
            <div id="visor-container"></div>
            <div style={{ "float": "right" }}>
                <button type="button" className="button-form" onClick={handleSignOut}>Sign Out</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Choose an image:</label>
                </div>
                <div>
                    {images.map((image) => (
                        <img
                            key={image.src}
                            src={image.src}
                            alt={image.name}
                            style={{ border: selectedImage === image ? "2px solid blue" : "" }}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
                <div>
                    <button type="submit" className="button-form">Choose</button>
                </div>
                {classifiedNumber != undefined && <div>
                    <h4>Classified number is</h4>
                    <h4>{classifiedNumber}</h4>
                </div>}
            </form>
        </>
    );
};

export default ClassificationPage;


