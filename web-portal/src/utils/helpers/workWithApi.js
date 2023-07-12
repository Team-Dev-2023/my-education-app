import axios from "axios";

import { API_ENDPOINT } from "../../constants/api";
const api = process.env.REACT_APP_API;
const qs = require("qs");

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
//COURSE
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
//CART
export async function postItemCart(accessToken, courseUuid, callback) {
  let data = qs.stringify({
    courseUuid: courseUuid,
  });

  try {
    const response = await axios.post(`${api}${API_ENDPOINT.CART}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return callback();
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function deleteItemCart(accessToken, courseUuid, callback) {
  try {
    const response = await axios.delete(`${api}${API_ENDPOINT.CART}`, {
      data: {
        courseUuid: courseUuid,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return callback();
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function putProfile(accessToken, dataProfilePut, callback) {
  try {
    const response = await axios.put(
      `${api}${API_ENDPOINT.PROFILE}`,
      dataProfilePut,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return callback(true);
  } catch (error) {
    console.error(error);
    return;
  }
}
