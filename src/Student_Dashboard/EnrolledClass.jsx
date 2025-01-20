import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../providers/AuthProvider";

const EnrolledClass = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage] = useState(6); 
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      if (!user?.email) {
        console.error("User not logged in.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/enrollments/${user.email}`);
        setEnrolledClasses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      }
    };

    fetchEnrolledClasses();
  }, [user]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = enrolledClasses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(enrolledClasses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">My Enrolled Classes</h2>

      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentItems.map((enrollment) => (
            <div
              key={enrollment._id}
              className="border rounded-lg shadow-lg overflow-hidden sm:flex bg-white"
            >
              <img
                src={enrollment.class?.image || "https://via.placeholder.com/300"}
                alt={enrollment.class?.title || "Class Image"}
                className="sm:w-44 sm:h-40 object-cover"
              />

              <div className="p-4 sm:w-7/12">
                <h3 className="text-xl font-bold">
                  {enrollment.class?.title || "Unknown Class"}
                </h3>
                <p className="text-gray-600">
                  <strong>Instructor:</strong> {enrollment.class?.instructor || "Unknown"}
                </p>
                <p className="text-gray-500 text-sm">
                  Enrolled on: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </p>
              </div>

              <div className="p-4 sm:w-2/12 my-auto">
                <button
                  onClick={() => navigate(`../myenroll-class/${enrollment.classId}`)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No enrolled classes found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledClass;
