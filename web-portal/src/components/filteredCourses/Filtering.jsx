import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Filtering({ handleSetViewingCourses, inputCourses }) {
  const dispatch = useDispatch();
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      sortBy: "ratings",
      ratings: 0,
      videoDuration: [{ min: 0, max: Number.MAX_SAFE_INTEGER }],
    },
  });
  console.log(watch(["sortBy", "ratings", "checkbox"]));
  const onSubmit = (event) => {
    event.preventdefault();
    console.log(event.target);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <p>Sort by:</p>
          <select {...register("sortBy")}>
            <option value="ratings">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p>Ratings:</p>
          <div className="flex flex-row">
            <input type="radio" value="1" {...register("ratings")} />
            <div>1 sao</div>
          </div>
          <div className="flex flex-row">
            <input type="radio" value="2" {...register("ratings")} />
            <div>2 sao</div>
          </div>
        </div>
        <div className="flex flex-col">
          <p>Video Duration:</p>
          <div className="flex flex-row">
            <input
              type="checkbox"
              value={{ min: 2, max: 123123123 }}
              {...register("checkbox")}
            />
            <div>1 sao</div>
          </div>
          <div className="flex flex-row">
            <input
              type="checkbox"
              value={{ min: 33, max: 123123122343 }}
              {...register("checkbox")}
            />
            <div>2 sao</div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Filtering;
