import { Button, Select, Steps, theme, Form, Input, Radio } from "antd";
import { ROUTES } from "constants/routes";
import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesAction,
  getSubCategoriesAction,
  getTopicsAction,
  postCourseAction,
} from "redux/actions";

import { MdOndemandVideo } from "react-icons/md";
import { MdArticle } from "react-icons/md";

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createCourseForm] = Form.useForm();
  const [formNoSubmit] = Form.useForm();

  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const { categories } = useSelector((store) => store.cate_subCate_topic);
  const { subCategories } = useSelector((store) => store.cate_subCate_topic);
  const { topics } = useSelector((store) => store.cate_subCate_topic);
  const [categoriesForOptions, setCategoriesForOptions] = useState([]);
  const [subCategoriesForOptions, setSubCategoriesForOptions] = useState([]);
  const [topicsForOptions, setTopicsForOptions] = useState([]);
  const [submitCourse, setSubmitCourse] = useState(false);

  const [dataCourse, setDataCourse] = useState({
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    topicUuid: "",
    courseKnowledgeList: [],
    sections: [
      {
        name: "string",
        lectures: [
          {
            name: "string",
            url: "",
            description: "string",
            preview: false,
            type: 0,
            videoDuration: 0,
          },
        ],
      },
    ],
    coursePrerequisiteList: [],
    courseRecommendationList: [],
  });

  //POST COURSE
  const onFinishCreateCourse = (data) => {
    dispatch(
      postCourseAction({
        accessToken: accessToken,
        data: data,
        callback: (courseUuid) => {
          navigate(
            generatePath(ROUTES.LECTURE.CHANGE_INFO_COURSE, {
              courseUuid: courseUuid,
            })
          );
        },
      })
    );
  };
  useEffect(() => {
    submitCourse && onFinishCreateCourse(dataCourse);
  }, [dataCourse]);

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

  // FORM STEP
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "First",
      content: (
        <div className="flex flex-col gap-8 justify-center items-center">
          <h2 className="font-[700] text-[24px]">
            First, let's find out what type of course you're making.
          </h2>

          <Form
            form={createCourseForm}
            onFinish={(value) => {
              setSubmitCourse(false);
              // setDataCourse((prevFormData) => ({
              //   ...prevFormData,
              //   ...value,
              // }));
              next();
            }}
          >
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input type of course ",
                },
              ]}
            >
              <Radio.Group size="large" className="flex gap-6">
                <Radio.Button
                  className="w-[250px] !h-[250px] flex justify-center items-center !rounded-none"
                  value="Video"
                >
                  <div className="flex justify-center items-center flex-col gap-3">
                    <MdOndemandVideo className="text-[60px]" />
                    <h5 className="text-[24px] font-[700]">Course</h5>
                    <p className="text-center leading-6">
                      Create rich learning experiences with the help of video
                      lectures, quizzes, coding exercises, etc.
                    </p>
                  </div>
                </Radio.Button>
                <Radio.Button
                  className="w-[250px] !h-[250px] flex justify-center items-center !rounded-none"
                  value="Video"
                  disabled
                >
                  <div className="flex justify-center items-center flex-col gap-3">
                    <MdArticle className="text-[60px]" />
                    <h5 className="text-[24px] font-[700]">Practice Test</h5>
                    <p className="text-center leading-6">
                      Help students prepare for certification exams by providing
                      practice questions.
                    </p>
                  </div>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Second",
      content: (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="font-[700] text-[24px]">How about a working title?</h2>
          <p>
            It's ok if you can't think of a good title now. You can change it
            later.
          </p>
          <Form
            form={createCourseForm}
            onFinish={(value) => {
              setSubmitCourse(false);
              setDataCourse((prevFormData) => ({
                ...prevFormData,
                ...value,
              }));
              next();
            }}
            className="w-full"
          >
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input  course title",
                },
              ]}
            >
              <Input
                placeholder="Insert your course title"
                showCount
                maxLength={120}
                className="max-w-[800px] !w-full mt-6 rounded-none !h-[48px] text-[20px]"
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Last",
      content: (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="font-[700] text-[24px]">
            What topic best fits the knowledge you'll share?
          </h2>
          <p>
            If you're not sure about the right topic, you can change it later.
          </p>
          <Form
            form={createCourseForm}
            className="flex gap-4 w-full"
            onFinish={(value) => {
              setSubmitCourse(true);
              setDataCourse((prevFormData) => ({
                ...prevFormData,
                topicUuid: value.topicUuid,
                // ...value,
              }));

              next();
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
                placeholder="Select Topic"
                options={topicsForOptions}
                disabled={!createCourseForm.getFieldValue("subCategoryUuid")}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className=" w-full flex justify-center p-8">
      <div className="max-w-[1200px] w-full">
        <Steps current={current} items={items} />
        <div className="flex justify-center items-center min-h-[400px]">
          {steps[current]?.content}
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {current < steps.length - 1 && (
            <Button
              className="rounded-none bg-[#1c1d1f] text-white !text-[40px]
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
              onClick={() => {
                createCourseForm.submit();
              }}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              className="rounded-none bg-[#1c1d1f] text-white !text-[40px]
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
              onClick={() => {
                createCourseForm.submit();
              }}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              className="rounded-none b text-black !text-[40px] border-black
               flex items-center justify-center w-[100px] h-[60px] !hover:text-white"
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateCoursePage;
