import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { authContext } from "../providers/AuthProvider";

const EnrolledClassDetails = () => {
  const { id } = useParams();
  const { user } = useContext(authContext);
  const [assignments, setAssignments] = useState([]);
  const [submissionTexts, setSubmissionTexts] = useState({});
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/assignments/${id}`);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [id]);

  const handleSubmissionChange = (assignmentId, value) => {
    setSubmissionTexts((prev) => ({
      ...prev,
      [assignmentId]: value,
    }));
  };

  const handleSubmitAssignment = async (assignmentId) => {
    const submissionText = submissionTexts[assignmentId] || "";

    if (!submissionText.trim()) {
      toast.error("Submission cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/submit-assignment", {
        assignmentId,
        userEmail: user?.email,
        submissionText, 
      });

      if (response.data.success) {
        toast.success("Assignment submitted successfully!");
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment._id === assignmentId
              ? { ...assignment, submissionCount: (assignment.submissionCount || 0) + 1 }
              : assignment
          )
        );
        setSubmissionTexts((prev) => ({ ...prev, [assignmentId]: "" })); 
      }
    } catch (error) {
      toast.error("Error submitting assignment.");
      console.error(error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post("http://localhost:5000/submit-feedback", {
        classId: id,
        userEmail: user?.email,
        rating,
        description,
      });

      if (response.data.success) {
        toast.success("Feedback submitted successfully!");
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("Error submitting feedback.");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Enrolled Class Details</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Deadline</th>
            <th className="border p-2">Submissions</th>
            <th className="border p-2">Submission Box</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id} className="border">
              <td className="border p-2">{assignment.title}</td>
              <td className="border p-2">{assignment.description}</td>
              <td className="border p-2">{assignment.deadline}</td>
              <td className="border p-2">{assignment.submissionCount || 0}</td>
              <td className="border p-2">
                <textarea
                  className="border w-full p-1"
                  rows="2"
                  value={submissionTexts[assignment._id] || ""}
                  onChange={(e) => handleSubmissionChange(assignment._id, e.target.value)}
                  placeholder="Enter your submission here"
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleSubmitAssignment(assignment._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Teaching Evaluation Report
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Teaching Evaluation Report</h2>
            <label className="block mb-2">Description:</label>
            <textarea
              className="border p-2 w-full"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="block mt-2">Rating:</label>
            <ReactStars
              count={5}
              size={30}
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledClassDetails;
