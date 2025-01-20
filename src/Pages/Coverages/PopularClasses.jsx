import React, { useState, useEffect } from "react";
import Headlines from "../Shared/Headlines/Headlines";
import { Link } from "react-router-dom";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollmentCounts, setEnrollmentCounts] = useState({});

  useEffect(() => {
    const fetchPopularClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        const approvedClasses = data.filter((classItem) => classItem.status === "approved");
        await fetchEnrollmentCounts(approvedClasses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrollmentCounts = async (classes) => {
      const counts = {};
      for (const classItem of classes) {
        try {
          const response = await fetch(
            `http://localhost:5000/enrollments/count/${classItem._id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch enrollment count");
          }
          const data = await response.json();
          counts[classItem._id] = data.count || 0;
        } catch (error) {
          console.error("Error fetching enrollment count:", error);
          counts[classItem._id] = 0;
        }
      }
      setEnrollmentCounts(counts);

      // Sort classes by enrollment count in descending order and pick top 8
      const sortedClasses = classes
        .map((classItem) => ({
          ...classItem,
          enrollmentCount: counts[classItem._id] || 0,
        }))
        .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
        .slice(0, 8);

      setClasses(sortedClasses);
    };

    fetchPopularClasses();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-2">Loading popular classes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-2">{error}</p>;
  }

  if (classes.length === 0) {
    return <p className="text-center text-gray-500 text-xl mt-2">No popular classes available.</p>;
  }

  return (
    <div className="mx-auto w-11/12 sm:w-9/12 my-12">
      <Headlines
        heading={"Popular Courses"}
        subHeading={"Top-rated courses based on enrollments"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {classes.map((classItem, index) => (
          <div key={index} className="card bg-base-100 shadow-lg w-full p-6">
            <img
              src={classItem.image}
              alt={classItem.title}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <div className="min-h-56">
                 <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
            <p className="text-gray-500 mb-2">By {classItem.instructor}</p>
            <p className="text-lg font-bold mb-2">${classItem.price}</p>
            <p className="text-gray-700 mb-4">{classItem.shortDescription}</p>
            </div>
           

            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Enrollments: {classItem.enrollmentCount || 0}
              </span>
              <Link
                to={`/class/${classItem._id}`}
                className="btn bg-orange-400 w-4/12 text-white"
              >
                Enroll
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
