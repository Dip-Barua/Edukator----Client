import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassReview = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [classesPerPage] = useState(6); 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Error fetching classes.");
      }
    };

    fetchClasses();
  }, []);

  const handleApprove = async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/classes/${classId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      });

      if (!response.ok) {
        throw new Error("Failed to approve class");
      }

      setClasses(classes.map((classItem) =>
        classItem._id === classId ? { ...classItem, status: "approved" } : classItem
      ));

      toast.success("Class approved successfully.");
    } catch (error) {
      toast.error(`Error approving class: ${error.message}`);
    }
  };

  const handleDetails = (classId) => {
    navigate(`/admin-dashboard/class-details/${classId}`);
  };

  const handleReject = async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/classes/${classId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject class");
      }

      setClasses(classes.map((classItem) =>
        classItem._id === classId ? { ...classItem, status: "rejected" } : classItem
      ));

      toast.success("Class rejected.");
    } catch (error) {
      toast.error(`Error rejecting class: ${error.message}`);
    }
  };

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  const totalPages = Math.ceil(classes.length / classesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Typography variant="h4" className="text-center" gutterBottom>
        Class Review
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Short Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentClasses.map((classItem) => (
              <TableRow key={classItem._id}>
                <TableCell>{classItem.title}</TableCell>
                <TableCell>
                  <img src={classItem.image} alt={classItem.title} width="50" />
                </TableCell>
                <TableCell>{classItem.email}</TableCell>
                <TableCell>{classItem.shortDescription}</TableCell>
                <TableCell>{classItem.status}</TableCell>
                <TableCell>
                  {classItem.status === "pending" && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(classItem._id)}
                        style={{ marginRight: "8px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(classItem._id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {classItem.status === "approved" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDetails(classItem._id)}

                    >
                      View Progress
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              variant={currentPage === index + 1 ? 'contained' : 'outlined'}
              color="primary"
              style={{ margin: "0 5px" }}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default ClassReview;
