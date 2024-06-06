import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const NOTES_ROUTE = process.env.NEXT_PUBLIC_API_NOTES_ROUTE;
const PUBLISH_ROUTE = process.env.NEXT_PUBLIC_API_PUBLISH_ROUTE;
const GET_VERIFIED_NOTES = process.env.NEXT_PUBLIC_GET_VERIFIED_NOTES;
const GET_ALL_NOTES = process.env.NEXT_PUBLIC_GET_ALL_NOTES;
const DELETE_NOTE = process.env.NEXT_PUBLIC_DELETE_NOTE;
const VERIFY_NOTE = process.env.NEXT_PUBLIC_VERIFY_NOTE;
const INCREASE_LIKE_COUNT = process.env.NEXT_PUBLIC_LIKE_COUNT;
const INCREASE_VIEW_COUNT = process.env.NEXT_PUBLIC_VIEW_COUNT;
const INCREASE_DOWNLOAD_COUNT = process.env.NEXT_PUBLIC_DOWNLOAD_COUNT;

export const publishNotesAPI = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${NOTES_ROUTE}${PUBLISH_ROUTE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
   
    return response.data;  
  } catch (error) {
    console.error("Error publishing notes:", error);
    throw error;
  }
};

export const getNotes = async (isAdmin) => {
  try {
    const route = isAdmin ? GET_ALL_NOTES : GET_VERIFIED_NOTES;
    const response = await axios.get(`${BASE_URL}${NOTES_ROUTE}${route}`);
    
    return response; 
  } catch (error) {
    
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}${NOTES_ROUTE}${DELETE_NOTE}/${id}`);
    
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

export const verifyNote = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}${NOTES_ROUTE}${VERIFY_NOTE}/${id}`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const increaseLikeCount = async(id) =>{
  try {
    const response = await axios.post(`${BASE_URL}${NOTES_ROUTE}${INCREASE_LIKE_COUNT}/${id}`)
   
    return response.data;
  } catch (error) {
    throw(error)
  }
}

export const increaseViewCount = async(id) =>{
  try {
    const response = await axios.post(`${BASE_URL}${NOTES_ROUTE}${INCREASE_VIEW_COUNT}/${id}`)
    
    return response.data;
  } catch (error) {
    throw(error)
  }
}


export const increaseDownloadCount = async(id) =>{
  try {
    const response = await axios.post(`${BASE_URL}${NOTES_ROUTE}${INCREASE_DOWNLOAD_COUNT}/${id}`)
    
    return response.data;
  } catch (error) {
    throw(error)
  }
}