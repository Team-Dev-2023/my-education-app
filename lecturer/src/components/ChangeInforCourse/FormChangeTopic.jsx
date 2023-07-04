import React, { useEffect, useState } from "react";

import { Form, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategoriesAction,
  getSubCategoriesAction,
  getTopicsAction,
} from "redux/actions";

function FormChangeTopic({
  formInfoCourse,
  infoCourse,
  setInfoCourse,
  handleSubmitInfoCourse,
}) {
  const dispatch = useDispatch();
  const { categories } = useSelector((store) => store.cate_subCate_topic);
  const { subCategories } = useSelector((store) => store.cate_subCate_topic);
  const { topics } = useSelector((store) => store.cate_subCate_topic);
  const [categoriesForOptions, setCategoriesForOptions] = useState([]);
  const [subCategoriesForOptions, setSubCategoriesForOptions] = useState([]);
  const [topicsForOptions, setTopicsForOptions] = useState([]);
  //get categories when render cpn
  useEffect(() => {
    dispatch(
      getCategoriesAction({
        page: 1,
        perPage: 10,
      })
    );
  }, []);

  //get subCate, topic when infoCourseClone changed
  useEffect(() => {
    getSubCategories(infoCourse?.category);
    getTopics(infoCourse?.subCategory);
  }, [infoCourse]);

  //function get  subCate, topic
  const getSubCategories = (value) => {
    setSubCategoriesForOptions([]);
    dispatch(
      getSubCategoriesAction({
        page: 1,
        perPage: 10,
        categoryUuid: value,
      })
    );
  };
  const getTopics = (value) => {
    setTopicsForOptions([]);
    dispatch(
      getTopicsAction({
        page: 1,
        perPage: 10,
        subCategoryUuid: value,
      })
    );
  };
  //COVERT DATA FROM API TO DATA USED FOR OPTION ANT
  useEffect(() => {
    setCategoriesForOptions([]);
    categories?.data?.map((item) => {
      setCategoriesForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [categories]);
  useEffect(() => {
    setSubCategoriesForOptions([]);
    subCategories?.data?.map((item) => {
      setSubCategoriesForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [subCategories]);
  useEffect(() => {
    setTopicsForOptions([]);
    topics?.data?.map((item) => {
      setTopicsForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [topics]);

  return (
    <Form
      form={formInfoCourse}
      name="changeTopic"
      onFinish={handleSubmitInfoCourse}
      fields={[
        {
          name: "category",
          value: infoCourse?.category,
        },
        {
          name: "subCategory",
          value: infoCourse?.subCategory,
        },
        {
          name: "topic",
          value: infoCourse?.topic,
        },
      ]}
      className="flex flex-col gap-4 "
    >
      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please select your category of course!",
          },
        ]}
      >
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Select category"
          options={categoriesForOptions}
          onChange={(value) => {
            setInfoCourse({
              ...infoCourse,
              category: value,
              topic: undefined,
              subCategory: undefined,
            });

            formInfoCourse.setFieldsValue({
              subCategoryUuid: undefined,
              topicUuid: undefined,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label="subCategory"
        name="subCategory"
        rules={[
          {
            required: true,
            message: "Please select your subCategory of course!",
          },
        ]}
        style={{
          display: "flex",
          // flexDirection: "column",
        }}
      >
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Select subCategory"
          options={subCategoriesForOptions}
          onChange={(value) => {
            setInfoCourse({
              ...infoCourse,
              subCategory: value,
              topic: undefined,
            });

            formInfoCourse.setFieldsValue({
              topicUuid: undefined,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label="Topic"
        name="topic"
        rules={[
          {
            required: true,
            message: "Please select your topic of course!",
          },
        ]}
      >
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Select topic"
          options={topicsForOptions}
          disabled={!formInfoCourse.getFieldValue("subCategory")}
          onChange={(value) => {
            setInfoCourse({
              ...infoCourse,
              topic: value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default FormChangeTopic;
