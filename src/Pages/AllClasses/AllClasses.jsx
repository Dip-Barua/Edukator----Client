import React, { useState, useEffect } from "react";
import Headlines from "./../Shared/Headlines/Headlines";
import { Link } from "react-router-dom";

const AllClasses = () => {
  const [classesData, setClassesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 12;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes");
        if (!response.ok) {
          throw new Error("Failed to fetch classes data");
        }
        const data = await response.json();
        setClassesData(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const approvedClasses = classesData.filter(classItem => classItem.status === 'approved');

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = approvedClasses.slice(indexOfFirstClass, indexOfLastClass);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(approvedClasses.length / classesPerPage);

  return (
    <div>
      <Headlines
        heading={"Explore Our All Classes"}
        subHeading={"Explore, Learn, and Grow with Our Curated Classes"}
      />
      <div className="w-9/12 mx-auto mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-4">
          {currentClasses.map((classItem, index) => (
            <div key={index} className="card bg-base-100 shadow-lg w-full p-6">
              <img
                src={classItem.image} 
                alt={classItem.title}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2 min-h-10">{classItem.title}</h3>
              <p className="text-gray-500 mb-2">By {classItem.instructor}</p>
              <p className="text-lg font-bold mb-2">{classItem.price}$</p>
              <p className="text-gray-700 mb-4 min-h-20">{classItem.shortDescription}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  Total Enrollments: {classItem.totalEnrollment}
                </span>
                <Link to={`/class/${classItem._id}`} className="btn bg-orange-400 w-4/12 text-white">
                  Enroll
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="btn-group">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`btn ${currentPage === index + 1 ? "btn-active bg-orange-400" : ""}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
