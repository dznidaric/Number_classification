import axios from "axios";

const baseUrl = "http://localhost:3000/classify";

const uploadImage = async (formData: FormData) => {
    const response = await axios.post(baseUrl, formData);
    return response.data;
};

const getImage = async (id: string) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const classificationService = {
    uploadImage,
    getImage,
};

export default classificationService;