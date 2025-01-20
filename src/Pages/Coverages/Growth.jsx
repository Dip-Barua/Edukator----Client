import React, { useState, useEffect } from "react";
import Headlines from "../Shared/Headlines/Headlines";
import growth from "../../assets/Gif/Growth.gif";

const Growth = () => {
  const [userCount, setUserCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userResponse = await fetch("https://edukator-server.vercel.app/api/users");
        const userData = await userResponse.json();
        setUserCount(userData.users.length);

        const classResponse = await fetch("https://edukator-server.vercel.app/classes/");
        const classData = await classResponse.json();
        setClassCount(classData.length);

        const enrollmentResponse = await fetch("https://edukator-server.vercel.app/enrollments");
        const enrollmentData = await enrollmentResponse.json();
        setEnrollmentCount(enrollmentData.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-2">Loading growth data...</p>;
  }
  return (
    <>
      <div>
        <Headlines
          heading={"Our Growth & Reach"}
          subHeading={"See How We've Grown, Together"}
        ></Headlines>
        <div className="card bg-base-100 w-11/12 sm:w-8/12 p-6 rounded-2xl shadow-lg mx-auto">
          <div className="flex flex-col sm:flex-row justify-between">


            <div className="flex flex-col gap-5 w-full sm:w-6/12">

              <div className="card bg-base-100 w-11/12 p-6 rounded-2xl shadow-md mx-auto items-center flex flex-row gap-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

              <h2 className="text-xl sm:text-3xl font-semibold w-6/12">Total Users : </h2>
              <h2 className="text-3xl font-bold text-orange-400">{userCount}+ </h2>
              </div>
              <div className="card bg-base-100 w-11/12 p-6 rounded-2xl shadow-md mx-auto items-center flex flex-row gap-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

              <h2 className="text-xl sm:text-3xl font-semibold w-6/12">Total Classes: </h2>
              <h2 className="text-3xl font-bold text-orange-400">{classCount}+ </h2>
              </div>
              <div className="card bg-base-100 w-11/12 p-6 rounded-2xl shadow-md mx-auto items-center flex flex-row gap-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

              <h2 className="text-xl sm:text-3xl font-semibold w-6/12">Total Enrollments : </h2>
              <h2 className="text-3xl font-bold text-orange-400">{enrollmentCount}+ </h2>
              </div>
            </div>


            <div className="flex w-full sm:w-6/12 justify-center py-5 sm:justify-end">
              <img src={growth} alt="" className=" w-8/12 sm:w-8/12 h-50 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Growth;
