import { envConfig } from "@/config/envConfig";
import type { generateComponentOnVercelProps } from "@/types/functions.types";
import axios from "axios";

const baseURL = envConfig.VITE_API_URL;

export const generateComponentOnVercel = async (props: generateComponentOnVercelProps) => {
    try {   
        const res = await axios.post(`${baseURL}/api/v1/genai/generate-component`, {
            prompt: props.prompt,
            image: 'http://localhost:6001/image.png'
        });
        console.log(res.data.data);
    } catch (error) {
        console.log(error);
    }
};
