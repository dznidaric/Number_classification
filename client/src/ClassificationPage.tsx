import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClassificationPage() {

    const navigate = useNavigate();

    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn") || localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) navigate('/login', { replace: true });
    }, []);




    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
    }

    const handleSignOut = () => {
        sessionStorage.clear();
    }


    return (
        <form onSubmit={handleSubmit}>
           <div style={{"float": "right"}}>
                <button type="button" onClick={handleSignOut}>Sign Out</button>
           </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    value={""}
                    onChange={handleImageChange}
                    required
                />
            </div>
            <div>
                <button type="submit">Choose</button>
            </div>
        </form>
    );
};

export default ClassificationPage;


