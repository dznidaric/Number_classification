import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassificationPage() {

    const navigate = useNavigate();

    const [classifiedNumber, setClassifiedNumber] = useState<number>();


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    }

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    }


    return (
        <>
            <h2 style={{ "textAlign": "center" }}>Number Classification App</h2>
            <div style={{ "float": "right" }}>
                <button type="button" className="button-form" onClick={handleSignOut}>Sign Out</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="image">Choose an image:</label>

                </div>
                <div>
                    <h4>{classifiedNumber}</h4>
                </div>
                <div>
                    <button type="submit" className="button-form">Choose</button>
                </div>
            </form>
        </>
    );
};

export default ClassificationPage;


