import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Rating } from "@mui/material"; 
import Headlines from "../Shared/Headlines/Headlines";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("https://edukator-server.vercel.app/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-2">Loading feedback...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-2">{error}</p>;
  }

  if (feedbacks.length === 0) {
    return <p className="text-center text-gray-500 text-xl mt-2">No feedback available.</p>;
  }

  return (
    <div className=" mx-auto my-12">
      <Headlines heading={"User Feedback"} subHeading={"Feedback from Our Community"}></Headlines>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={5000}
        className="shadow-2zl w-8/12 mx-auto rounded-2xl bg-white"
      >
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="p-6 text-center">
            <div className="flex flex-col items-center">
              <div>
                <img
                  src={feedback.userDetails?.photoURL || "https://via.placeholder.com/150"}
                  alt={feedback.userDetails?.name || feedback.userEmail}
                  className="w-16 h-16 rounded-full mb-4"
                />
              </div>
              <h3 className="text-xl font-bold">
                {feedback.userDetails?.name || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{feedback.userEmail}</p>
              <p className="text-gray-700 italic">"{feedback.description}"</p>
              <Rating
                name="read-only-rating"
                value={feedback.rating} 
                precision={0.5} 
                readOnly 
                sx={{
                  marginTop: 1, 
                  color: "gold", 
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Feedback;
