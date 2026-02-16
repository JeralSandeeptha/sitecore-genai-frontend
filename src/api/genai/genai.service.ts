import { envConfig } from "@/config/envConfig";
import type { generateComponentOnVercelProps } from "@/types/functions.types";
import logger from "@/utils/logger";
import axios, { isAxiosError } from "axios";

const baseURL = envConfig.VITE_API_URL;

export const generateComponentOnVercel = async (props: generateComponentOnVercelProps) => {
    props.setIsLoading(true);
    try {   
        const res = await axios.post(`${baseURL}/gateway/ai/api/v1/genai/generate-component`, {
            prompt: props.prompt,
            image: props.image,
            userId: props.userId,
            taskId: props.taskId
        });

        logger.info(res.data);

        props.setIsLoading(false);
        props.addAlert('Component is generating. Adding to the queue', 'success');

    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 400) {
                props.setIsLoading(false);
                props.addAlert('Current password is wrong', 'error');
                return;
            }

            if (status === 401) {
                props.setIsLoading(false);
                props.addAlert('You are not authenticated', 'error');
                return;
            }

            if (status === 404) {
                props.setIsLoading(false);
                props.addAlert('User not found', 'error');
                return;
            }
        }
        console.log(error);
        logger.error(error);
        props.setIsLoading(false);
        props.addAlert('Failed to update password. Please try again later', 'error');
    }
};