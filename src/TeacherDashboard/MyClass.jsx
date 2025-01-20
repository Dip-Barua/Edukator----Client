import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../providers/AuthProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Modal,
  TextField,
  Box,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyClass = () => {
  const [classes, setClasses] = useState([]); 
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 
  const [currentClass, setCurrentClass] = useState(null); 
  const [updatedClassData, setUpdatedClassData] = useState({
    title: "",
    price: "",
    shortDescription: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to view your classes.");
      return;
    }

    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/classes?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch classes data");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          const filteredClasses = data.filter((classItem) => classItem.email === user.email);
          if (filteredClasses.length > 0) {
            setClasses(filteredClasses);
          } else {
            setClasses([]);
            toast.info("No classes found.");
          }
        } else {
          setClasses([]);  
          toast.error("Classes data is not in the expected format.");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Error fetching your classes.");
      }
    };

    fetchClasses();
  }, [user]);

  const handleDelete = async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/classes/${classId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete class");
      }
      toast.success("Class deleted successfully.");
      setClasses(classes.filter((classItem) => classItem._id !== classId));
    } catch (error) {
      toast.error("Error deleting class.");
    }
  };

  const handleUpdate = (classItem) => {
    setCurrentClass(classItem);
    setUpdatedClassData({
      title: classItem.title,
      price: classItem.price,
      shortDescription: classItem.shortDescription,
    });
    setOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!updatedClassData.title || !updatedClassData.price || !updatedClassData.shortDescription) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/classes/${currentClass._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClassData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      toast.success("Class updated successfully.");
      setOpen(false);

      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === currentClass._id ? { ...classItem, ...updatedClassData } : classItem
        )
      );
    } catch (error) {
      toast.error(`Error updating class: ${error.message}`);
    }
  };

  const handleDetails = (classId) => {
    navigate(`/teacher-dashboard/class-details/${classId}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastClass = currentPage * itemsPerPage;
  const indexOfFirstClass = indexOfLastClass - itemsPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Classes
      </Typography>

      {classes.length === 0 ? (
        <Typography>No classes found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="My Classes Table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentClasses.map((classItem) => (
                <TableRow key={classItem._id}>
                  <TableCell> <img src={classItem.image} className="w-32" alt="" /> </TableCell>
                  <TableCell>{classItem.title}</TableCell>
                  <TableCell>{classItem.instructor}</TableCell>
                  <TableCell>{classItem.email}</TableCell>
                  <TableCell>${classItem.price}</TableCell>
                  <TableCell>{classItem.shortDescription}</TableCell>
                  <TableCell>{classItem.status || "Pending"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleDetails(classItem._id)}
                      style={{ marginRight: "8px" }}
                    >
                      See Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(classItem)}
                      style={{ marginRight: "8px" }}
                      disabled={classItem.status === "rejected"}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(classItem._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Pagination
        count={Math.ceil(classes.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />

      {/* Update Class Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ backgroundColor: "white" }} className="mx-auto text-center w-4/12 p-5 mt-20 rounded-2xl">
          <Typography variant="h6" className="font-bold" gutterBottom>
            Update Class Details
          </Typography>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={updatedClassData.title}
            onChange={(e) => setUpdatedClassData({ ...updatedClassData, title: e.target.value })}
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={updatedClassData.price}
            onChange={(e) => setUpdatedClassData({ ...updatedClassData, price: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={updatedClassData.shortDescription}
            onChange={(e) =>
              setUpdatedClassData({ ...updatedClassData, shortDescription: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateSubmit}
            style={{ marginTop: "16px" }}
            className="rounded-xl"
          >
            Update Class
          </Button>
        </Box>
      </Modal>

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default MyClass;
