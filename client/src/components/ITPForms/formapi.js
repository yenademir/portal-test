import axios from 'axios';

const FORMS_API_URL = 'http://localhost:3001/forms';

export const getFormstable = async () => {
  try {
    const response = await axios.get(FORMS_API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

const FORMS_API_URL2 = 'http://localhost:3001/allforms';

export const getFormById = async (id) => {
  try {
    const response = await axios.get(`${FORMS_API_URL2}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching form:', error);
    throw error;
  }
};
