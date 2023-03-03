import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import classificationService from "./services/classificationService";

function ClassificationPage() {

    const navigate = useNavigate();

    interface ImageProps {
        name: string;
        src: string;
    }

    const images: ImageProps[] = [
        { name: "Number 0", src: require(".//lib/images/img_0.jpg") },
        { name: "Number 1", src: require(".//lib/images/img_1.jpg") },
        { name: "Number 2", src: require(".//lib/images/img_2.jpg") },
        { name: "Number 3", src: require(".//lib/images/img_3.jpg") },
        { name: "Number 4", src: require(".//lib/images/img_4.jpg") },
        { name: "Number 5", src: require(".//lib/images/img_5.jpg") },
        { name: "Number 6", src: require(".//lib/images/img_6.jpg") },
        { name: "Number 7", src: require(".//lib/images/img_7.jpg") },
        { name: "Number 8", src: require(".//lib/images/img_8.jpg") },
        { name: "Number 9", src: require(".//lib/images/img_9.jpg") },
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
            toast.success("Classified number successfully");
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
                            height={124}
                            width={124}
                            key={image.src}
                            src={image.src}
                            alt={image.name}
                            style={{ "border": selectedImage === image ? "2px solid blue" : "", "padding": "5px" }}
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
            <ToastContainer />
        </>
    );
};

export default ClassificationPage;


