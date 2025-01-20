import React from "react";
import crown from "../../assets/Icons/Abstract Line.png";

const Banner = () => {
  return (
    <div className="min-h-[40rem] flex flex-col items-center justify-center">
      <div className="card bg-base-100 min-w-[45%] min-h-[8rem] rounded-xl shadow-lg mx-auto my-12">
      <img src={crown} alt="" className="w-[2rem] absolute -top-6 -left-6" />
        <div className="p-5 flex flex-row items-center justify-around">
          <div className="p-3 bg-orange-100  rounded-md mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-[48px] font-sans font-semibold">
              Let's Grow Up with{" "}
              <span className="text-orange-500 font-b">Edukator</span>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">
        Your Path to Knowledge, Your Future to Shape 

        </h1>
        <h2 className="text-xl text-center  my-4">
            Learn from the Top Instructors worldwide.
        </h2>
      </div>
      <div className="w-8/12  mx-auto gap-5 text-center mt-6"> 
        <button className="p-2 rounded-xl hover:bg-white hover:text-black bg-orange-400 text-white text-xl w-2/12 mr-4">Explore </button>
        <button className="p-2 rounded-xl hover:bg-white hover:text-black bg-orange-400 text-white text-xl w-2/12 ">Join Now</button>
      </div>
    </div>
  );
};

export default Banner;
