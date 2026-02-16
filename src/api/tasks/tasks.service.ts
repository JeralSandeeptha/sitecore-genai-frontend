import axiosClient from '@/config/axiosClient';
import { envConfig } from '@/config/envConfig';
import type {
  createTaskProps,
  deleteTaskProps,
  getTasksByUserIdProps,
} from '@/types/functions.types';
import logger from '@/utils/logger';

const baseURL = envConfig.VITE_API_URL;
const domain = 'users';

export const getTasksByUserId = async (props: getTasksByUserIdProps) => {
  props.setIsLoading(true);
  try {
    const res = await axiosClient.get(
      `${baseURL}/gateway/${domain}/api/v1/task/user/${props.userId}`
    );
    logger.info(res.data.data);
    props.setIsLoading(false);
    props.setTasks(res.data.data);
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};

export const deleteTask = async (props: deleteTaskProps) => {
  props.setIsLoading(true);

  try {
    await axiosClient.delete(`${baseURL}/gateway/${domain}/api/v1/task/${props.taskId}`);

    logger.info('Task deleted successfully');

    props.setTasks((prevTasks) => prevTasks.filter((task) => task._id !== props.taskId));

    props.setIsLoading(false);
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
  }
};

export const createTask = async (props: createTaskProps) => {
  props.setIsLoading(true);

  try {
    const res = await axiosClient.post(`${baseURL}/gateway/${domain}/api/v1/task`, {
      prompt: props.prompt,
      image: props.image,
      user: props.userId,
    });

    logger.info('Task created successfully', res.data.data);
    props.addAlert('Background task was created', 'success');

    props.setIsLoading(false);

    return res.data.data._id;
  } catch (error) {
    console.log(error);
    props.setIsLoading(false);
    props.addAlert('Task was not created', 'error');
  }
};
