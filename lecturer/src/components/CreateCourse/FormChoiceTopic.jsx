import { Select, Form } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getSubCategoriesAction,
  getTopicsAction,
} from "redux/actions";

function FormChoiceTopic({ createCourseForm, onFinishCreateCourse }) {
  const dispatch = useDispatch();

  const { categories } = useSelector((store) => store.cate_subCate_topic);
  const { subCategories } = useSelector((store) => store.cate_subCate_topic);
  const { topics } = useSelector((store) => store.cate_subCate_topic);

  const [categoriesForOptions, setCategoriesForOptions] = useState([]);
  const [subCategoriesForOptions, setSubCategoriesForOptions] = useState([]);
  const [topicsForOptions, setTopicsForOptions] = useState([]);

  //get categories sub cate and topic
  useEffect(() => {
    dispatch(
      getCategoriesAction({
        page: 1,
        perPage: 10,
      })
    );
  }, []);

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
    categories?.data?.map((item) => {
      setCategoriesForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [categories]);
  useEffect(() => {
    subCategories?.data?.map((item) => {
      setSubCategoriesForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [subCategories]);
  useEffect(() => {
    topics?.data?.map((item) => {
      setTopicsForOptions((prevFormData) => [
        ...prevFormData,
        { label: item.name, value: item.uuid },
      ]);
    });
  }, [topics]);
  return (
    <div>
      <Form
        form={createCourseForm}
        onFinish={(value) => {
          onFinishCreateCourse(value.topicUuid);
        }}
        className="flex gap-4 w-full"
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
            className="selectCreateCoursePage"
            style={{
              width: 200,
            }}
            placeholder="Select category"
            options={categoriesForOptions}
            onChange={(value) => {
              getSubCategories(value);
              createCourseForm.setFieldsValue({
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
              getTopics(value);
              createCourseForm.setFieldsValue({
                topicUuid: undefined,
              });
            }}
            disabled={!createCourseForm.getFieldValue("categoryUuid")}
          />
        </Form.Item>

        <Form.Item
          label="Topic"
          name="topicUuid"
          rules={[
            {
              required: true,
              message: "Please select your Topic of course!",
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            onChange={(value) => {
              console.log(value);
            }}
            placeholder="Select Topic"
            options={topicsForOptions}
            disabled={!createCourseForm.getFieldValue("subCategoryUuid")}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormChoiceTopic;
