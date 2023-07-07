import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";

import {
  getCategory,
  getSubCategories,
  getTopics,
} from "../utils/helpers/workWithAPI";
function FormChangeTopic({
  formInfoCourse,
  infoCourse,
  setInfoCourse,
  handleSubmitInfoCourse,
  setIsAllowSaveInfoCourse,
}) {
  const [categoriesForOptions, setCategoriesForOptions] = useState([]);
  const [subCategoriesForOptions, setSubCategoriesForOptions] = useState([]);
  const [topicsForOptions, setTopicsForOptions] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  //get categories when render cpn
  useEffect(() => {
    getCategory(setCategories);
  }, []);

  //get subCate, topic when infoCourseClone changed
  useEffect(() => {
    getSubCategories(infoCourse?.categoryUuid, setSubCategories);
    getTopics(infoCourse?.subCategoryUuid, setTopics);
  }, [infoCourse]);

  //COVERT DATA FROM API TO DATA USED FOR OPTION ANT
  useEffect(() => {
    setCategoriesForOptions([]);
    categories?.map((item) => {
      setCategoriesForOptions((prevCategoriesForOptions) => [
        ...prevCategoriesForOptions,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [categories]);

  useEffect(() => {
    setSubCategoriesForOptions([]);
    subCategories?.map((item) => {
      setSubCategoriesForOptions((prevSubCategoriesForOptions) => [
        ...prevSubCategoriesForOptions,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [subCategories]);
  useEffect(() => {
    setTopicsForOptions([]);
    topics?.map((item) => {
      setTopicsForOptions((prevTopicsForOptions) => [
        ...prevTopicsForOptions,
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
          name: "categoryUuid",
          value: infoCourse?.categoryUuid,
        },
        {
          name: "subCategoryUuid",
          value: infoCourse?.subCategoryUuid,
        },
        {
          name: "topicUuid",
          value: infoCourse?.topicUuid,
        },
      ]}
      className="flex flex-col gap-4 ml-4"
      labelCol={{
        span: 10,
      }}
    >
      <Form.Item
        label="Category"
        name="categoryUuid"
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
              categoryUuid: value,
              topicUuid: undefined,
              subCategoryUuid: undefined,
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
        name="subCategoryUuid"
        rules={[
          {
            required: true,
            message: "Please select your subCategory of course!",
          },
        ]}
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
              subCategoryUuid: value,
              topicUuid: undefined,
            });

            formInfoCourse.setFieldsValue({
              topicUuid: undefined,
            });
          }}
        />
      </Form.Item>
      <Form.Item
        label="Topic"
        name="topicUuid"
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
          disabled={!formInfoCourse.getFieldValue("subCategoryUuid")}
          onChange={(value) => {
            setInfoCourse({
              ...infoCourse,
              topicUuid: value,
            });
            setIsAllowSaveInfoCourse && setIsAllowSaveInfoCourse(true);
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default FormChangeTopic;
