import React, { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const TeacherRequest = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; 

  const { data, error, isLoading } = useQuery({
    queryKey: ["teacher-request"],
    queryFn: async () => {
      const response = await axios.get("https://edukator-server.vercel.app/api/teacher-request");
      return response.data;
    },
  });

  const handleApprove = async (requestId, userEmail) => {
    try {
      const updatedRequests = data.map((request) =>
        request._id === requestId ? { ...request, status: "accepted" } : request
      );
      queryClient.setQueryData(["teacher-request"], updatedRequests);

      await axios.put(`https://edukator-server.vercel.app/api/teacher-request/${requestId}`, {
        status: "accepted",
      });

      await axios.put(`https://edukator-server.vercel.app/api/users`, {
        email: userEmail,
        role: "teacher",
      });

      queryClient.invalidateQueries(["teacher-request"]);
    } catch (error) {
      console.error("Error approving teacher request:", error);
      queryClient.invalidateQueries(["teacher-request"]);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const updatedRequests = data.map((request) =>
        request._id === requestId ? { ...request, status: "rejected" } : request
      );
      queryClient.setQueryData(["teacher-request"], updatedRequests);

      await axios.put(`https://edukator-server.vercel.app/api/teacher-request/${requestId}`, {
        status: "rejected",
      });

      queryClient.invalidateQueries(["teacher-request"]);
    } catch (error) {
      console.error("Error rejecting teacher request:", error);
      queryClient.invalidateQueries(["teacher-request"]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading teacher requests: {error.message}</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Teacher Requests</h1>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Experience</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((request) => (
            <tr key={request._id}>
              <td className="border p-2">{request.name}</td>
              <td className="border p-2">
                <img
                  src={request.image || "/default-profile.png"}
                  alt={request.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </td>
              <td className="border p-2">{request.experience}</td>
              <td className="border p-2">{request.title}</td>
              <td className="border p-2">{request.category}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded-full ${
                    request.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : request.status === "accepted"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td className="border p-2">
                {request.status === "pending" && (
                  <>
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleApprove(request._id, request.email)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {request.status === "rejected" && (
                  <button className="btn btn-danger" disabled>
                    Rejected
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeacherRequest;
