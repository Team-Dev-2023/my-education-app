import axios from "axios";
import { API_ENDPOINT } from "../../constants/api";
const api = process.env.REACT_APP_API;

export async function getCategory(setCategories) {
  let page = 1;
  let perPage = 10;
  try {
    const response = await axios.get(
      `${api}${API_ENDPOINT.CATEGORIES}?page=${page}&perPage=${perPage}`
    );
    const categories = response.data.data;
    return setCategories(categories);
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getSubCategories(categoryUuid, setSubCategories) {
  let page = 1;
  let perPage = 10;
  try {
    const response = await axios.get(
      `${api}${API_ENDPOINT.SUB_CATEGORIES}?page=${page}&perPage=${perPage}&categoryUuid=${categoryUuid}`
    );
    const subCategories = response.data.data;
    return setSubCategories(subCategories);
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function getTopics(subCategoryUuid, setTopics) {
  let page = 1;
  let perPage = 10;
  try {
    const response = await axios.get(
      `${api}${API_ENDPOINT.TOPICS}?page=${page}&perPage=${perPage}&subCategoryUuid=${subCategoryUuid}`
    );
    const topics = response.data.data;
    return setTopics(topics);
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function getListCourse(setListCourse) {
  let page = 1;
  let perPage = 10;
  try {
    const response = await axios.get(
      `${api}${API_ENDPOINT.COURSES}?page=${page}&perPage=${perPage}`
    );
    const listCourse = response.data.data;
    return setListCourse(listCourse);
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getCourse(courseUuid, setDataCourse) {
  try {
    const response = await axios.get(
      `${api}${API_ENDPOINT.COURSES}/${courseUuid}`
    );

    return setDataCourse(response.data);
  } catch (error) {
    console.error(error);
    return;
  }
}
