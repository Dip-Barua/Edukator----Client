import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ClassDetails = () => {
  const { id } = useParams();
  const [classItem, setClassItem] = useState(null);
  const [enrollmentCount, setEnrollmentCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classResponse = await fetch(`http://localhost:5000/classes/${id}`);
        if (!classResponse.ok) {
          throw new Error("Class not found");
        }
        const classData = await classResponse.json();
        setClassItem(classData);
        const enrollmentResponse = await fetch(`http://localhost:5000/enrollments/count/${id}`);
        if (!enrollmentResponse.ok) {
          throw new Error("Enrollment count not found");
        }
        const enrollmentData = await enrollmentResponse.json();
        setEnrollmentCount(enrollmentData.count);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-2">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-2">{error}</p>;
  }

  if (!classItem) {
    return <p className="text-center text-red-500 text-xl mt-2">Class not found!</p>;
  }

  const handlePayNowClick = () => {
    navigate(`/payment/${id}`, {
      state: { price: classItem.price, classId: id },
    });
  };

  return (
    <div className=" w-10/12 sm:w-6/12 mx-auto my-12">
      <div className="card bg-base-100 shadow-xl p-6 gap-5 flex flex-col sm:flex-row">
        <div className=" w-full sm:w-5/12">
          <img
            src={classItem.image}
            alt={classItem.title}
            className="w-full h-40 sm:h-80 object-cover mb-6 rounded-lg"
          />
        </div>

        <div>
          <h2 className="text-xl sm:text-3xl font-bold mb-2">{classItem.title}</h2>
          <p className="text-gray-500 text-lg mb-4">By {classItem.instructor}</p>
          <p className="text-xl font-bold text-green-600 mb-4">{classItem.price} $</p>
          <p className="text-gray-700 mb-4">{classItem.shortDescription}</p>
          <p className="text-gray-700 mb-4">
            <strong>Total Enrollments:</strong> {enrollmentCount !== null ? enrollmentCount : "Loading..."}
          </p>
          <button onClick={handlePayNowClick} className="btn bg-orange-500 w-4/12 text-white">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
