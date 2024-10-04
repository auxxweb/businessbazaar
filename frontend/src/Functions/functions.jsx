import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const baseUrl = 'https://businessbazaarserver.auxxweb.in';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/category`, config); // Use backticks for template literals
        
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;
        if (data.success) {
            console.log('first')
            return data; // Return the data object
        } else {
            console.error("Failed to fetch categories");
        }
    } catch (error) {
        console.error("Error fetching categories:", error.message);
    }
};

export const fetchBusiness = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/business`, config); // Use backticks for template literals

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data; 

        if (data.success) {
            return data;
        } else {
            console.error("Failed to fetch Business");
        }
    } catch (error) {
        console.error("Error fetching Business:", error.message);
    }
};

export const fetchSearchCategory = async (search) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/category?page=1&limit=10&searchTerm=${search}`, config);
        
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.data;

        if (data.success) {
            return data;

        } else {
            console.error("Failed to fetch Search Value");
        }
    } catch (error) {
        console.error("Error fetching Search Value:", error.message);
    }
}

export const fetchBusinessTemplate = async (id)=>{
    try{
        const response = await axios.get(`${baseUrl}/api/v1/business/${id}`,config)

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = response.data;
        if (data.success){
            return data
        }else{
            console.error('Failed to fetch Search Value')
        }
    }catch(error){
        console.error("Failed to fetch Business Site Details");

    }
}