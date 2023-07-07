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

    setCategories(categories);
    return categories;
  } catch (error) {
    console.error(error);
    return [];
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
    setSubCategories(subCategories);
    return subCategories;
  } catch (error) {
    console.error(error);
    return [];
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
    setTopics(topics);
    return topics;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getListCourse(accessToken, setListCourse) {
  let page = 1;
  let perPage = 10;
  try {
    const response = await axios.get(
      `${api}${API_ENDPOINT.COURSES}?page=${page}&perPage=${perPage}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const listCourse = response.data.data;
    setListCourse(listCourse);
    return listCourse;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function postCourse(accessToken, dataCourse, callback) {
  try {
    const response = await axios.post(
      `${api}${API_ENDPOINT.COURSES}`,
      dataCourse,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const courseUuid = response.data.uuid;

    callback(courseUuid);
    return courseUuid;
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

    setDataCourse(response);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function putCourse(
  accessToken,
  courseUuid,
  dataCoursePut,
  callback
) {
  try {
    const response = await axios.put(
      `${api}${API_ENDPOINT.COURSES}/${courseUuid}`,
      dataCoursePut,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    callback();
    return courseUuid;
  } catch (error) {
    console.error(error);
    return;
  }
}
