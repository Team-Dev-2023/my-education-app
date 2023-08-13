import axios from "axios";

import { API_ENDPOINT } from "../../constants/api";
const api = process.env.REACT_APP_API;
const qs = require("qs");

// Category
export async function getCategory(
  setCategories,
  setIsLoad,
  page = 1,
  perPage = 100
) {
  try {
    const response = await axios.get(`${api}${API_ENDPOINT.CATEGORIES}`, {
      params: {
        page: page,
        perPage: perPage,
      },
    });
    const categories = response.data.data;
    return setCategories(categories), setIsLoad(false);
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function postCategory(data, accessToken) {
  try {
    const response = await axios.post(
      `${api}${API_ENDPOINT.CATEGORIES}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function deleteCategory(uuid, accessToken) {
  try {
    const response = await axios.delete(
      `${api}${API_ENDPOINT.CATEGORIES}/${uuid}`,
      {
        params: {
          uuid: uuid,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getSubCategories(categoryUuid, setSubCategories) {
  let page = 1;
  let perPage = 20;
  try {
    const response = await axios.get(`${api}${API_ENDPOINT.SUB_CATEGORY}`, {
      params: {
        page: page,
        perPage: perPage,
        categoryUuid: categoryUuid,
      },
    });
    const subCategories = response.data.data;
    return setSubCategories(subCategories);
  } catch (error) {
    console.error(error);
    return;
  }
}
export async function getTopics(subCategoryUuid, setTopics) {
  let page = 1;
  let perPage = 20;
  try {
    const response = await axios.get(`${api}${API_ENDPOINT.TOPIC}`, {
      params: {
        page: page,
        perPage: perPage,
        subCategoryUuid: subCategoryUuid,
      },
    });
    const topics = response.data.data;
    return setTopics(topics);
  } catch (error) {
    console.error(error);
    return;
  }
}
//COURSE
export async function getListCourse(
  setListCourse,
  setIsLoad,
  page = 1,
  perPage = 20,
  category,
  subcategory,
  topic
) {
  try {
    const response = await axios.get(`${api}${API_ENDPOINT.COURSES}`, {
      params: {
        page: page,
        perPage: perPage,
        categoryName: category,
        subCategoryName: subcategory,
        topicName: topic,
      },
    });
    const listCourse = response.data.data;
    return setListCourse(listCourse), setIsLoad(false);
  } catch (error) {
    console.error(error);
    return setIsLoad(false);
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
//USER
export async function getListAccount(
  accessToken,
  setListAccount,
  setIsLoad,
  page = 1,
  perPage = 20
) {
  try {
    const response = await axios.get(`${api}${API_ENDPOINT.USERS}`, {
      params: {
        page: page,
        perPage: perPage,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const listAccount = response.data.data;
    return setListAccount(listAccount), setIsLoad(false);
  } catch (error) {
    console.error(error);
    return setIsLoad(false);
  }
}
