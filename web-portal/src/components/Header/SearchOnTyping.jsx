import axios from "axios";
import { API_ENDPOINT } from "constants/api";
import { ROUTES } from "constants/routes";
import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const api = process.env.REACT_APP_API;

function SearchOnTyping() {
  const navigate = useNavigate();

  const [inputChange, setInputChange] = useState("");
  const [searchedCourses, setSearchedCourses] = useState([]);

  const searchResultDivRef = useRef(null);
  const inputFieldDivRef = useRef(null);

  const fetchSearchedCourses = async (query, perPage) => {
    const result = await axios.get(`${api}${API_ENDPOINT.COURSES}`, {
      params: {
        perPage: perPage,
      },
    });
    const fullCourses = await result.data.data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    return fullCourses;
  };
  const handleInputChange = (event) => {
    flushSync(() => {
      setInputChange(event.target.value);
    });
  };

  useEffect(() => {
    const debounceSearching = setTimeout(() => {
      fetchSearchedCourses(inputChange, 5).then((result) => {
        setSearchedCourses(result);
        // console.log("res", result);
      });
    }, 300);

    return () => {
      clearTimeout(debounceSearching);
    };
  }, [inputChange]);

  // console.log("searched courses", searchedCourses);

  useEffect(() => {
    if (inputFieldDivRef.current && searchResultDivRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          searchResultDivRef.current.style.width = `${width}px`;
        }
      });

      resizeObserver.observe(inputFieldDivRef.current);

      return () => {
        resizeObserver.unobserve(inputFieldDivRef.current);
      };
    }
  }, []);

  return (
    <div className="relative flex flex-col items-start">
      <div
        className="inline-flex w-full p-2 items-center rounded-full border-2 border-[#666163]"
        ref={inputFieldDivRef}
      >
        <AiOutlineSearch className="ml-1 opacity-80 text-[30px]" />
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`${ROUTES.USER.FULL_COURSES}/search/${inputChange}`);
            setInputChange("");
          }}
        >
          <input
            type="text"
            value={inputChange}
            onChange={handleInputChange}
            placeholder="Search for anything"
            className="pl-1 w-full rounded-full border-none focus:outline-none"
          />
        </form>
      </div>
      {searchedCourses.length > 0 && inputChange.length > 0 && (
        <div
          className="absolute top-[50px] flex flex-col bg-[#fff] mt-[4px] py-[8px] border border-[#d1d7dc] z-[1000] text-ellipsis whitespace-nowrap overflow-hidden"
          ref={searchResultDivRef}
        >
          {searchedCourses.map((item) => (
            <a
              key={item.uuid}
              className="flex flex-row pl-[12px] pr-[8px] py-[8px] cursor-pointer"
              href={`/detail/${item.uuid}`}
            >
              <div className="w-[32px] h-[32px] mr-[16px] flex justify-center">
                <img
                  src={
                    "https://img-c.udemycdn.com/course/750x422/2099246_11dc_2.jpg"
                  }
                  alt="course"
                  className="h-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-[16px] font-[700] leading-[1.2] text-ellipsis whitespace-nowrap">
                  {item.title}
                </div>
                <div className="text-[12px] font-[400] leading-[1.4]">
                  Created by: {item.createdBy}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchOnTyping;
