import { useEffect, useState } from "react";
import CarouselListProduct from "components/CarouselListProduct/CarouselListProduct";
import Slider from "components/Slider";
import TopicRecommended from "components/TopicRecommended";
import { getListCourse } from "utils/helpers/workWithApi";
import axios from "axios";
import { ROUTES } from "constants/routes";
import { CircularProgress } from "@mui/material";

const api = process.env.REACT_APP_API;

function Homepage() {
  const [listCourse, setListCourse] = useState([]);
  const [topics, setTopics] = useState([]);
  const fetchAllTopics = async () => {
    try {
      const response = await axios.get(`${api}${ROUTES.USER.TOPICS}`, {
        params: {
          page: 1,
          perPage: 100,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    getListCourse(setListCourse);
    fetchAllTopics()
      .then((result) => setTopics(result))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      {listCourse.length > 0 ? (
        <div className="flex justify-center items-center flex-col w-full xxs:px-[24px]">
          <div className="max-w-[1200px] ">
            <Slider />
            {topics.length > 0 ? (
              <TopicRecommended topics={topics} />
            ) : (
              <p className="text-center">Loading topics</p>
            )}
          </div>
          <div className="my-[20px] w-full xxs:max-w-full lg:max-w-[1200px] flex justify-center ">
            <CarouselListProduct
              listProduct={listCourse}
              name_carousel={"highCourses"}
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto h-32 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Homepage;
