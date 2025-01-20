import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, TextField, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeeDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [enrollmentCount, setEnrollmentCount] = useState(0);  // State for enrollment count
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    deadline: '',
    description: '',
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/classes/${id}`);
        setClassData(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching class data:', error);
        toast.error('Error fetching class details.');
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/assignments?classId=${id}`);
        setAssignments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        toast.error('Error fetching assignments.');
        setAssignments([]); 
      }
    };

    if (classData) {
      fetchAssignments();
    }
  }, [classData, id]);

  // Fetch enrollment count after classData is set
  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/enrollments/count/${id}`);
        setEnrollmentCount(response.data.count || 0);  // Set enrollment count
      } catch (error) {
        console.error('Error fetching enrollment count:', error);
        toast.error('Error fetching enrollment count.');
        setEnrollmentCount(0);  // Set default to 0 if there's an error
      }
    };

    if (classData) {
      fetchEnrollmentCount();
    }
  }, [classData, id]);

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.deadline || !newAssignment.description) {
      toast.error('All fields are required.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/assignments', {
        title: newAssignment.title,
        deadline: newAssignment.deadline,
        description: newAssignment.description,
        classId: id, 
      });
  
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        { ...newAssignment, id: response.data.assignmentId },
      ]);
      setNewAssignment({ title: '', deadline: '', description: '' });
      setIsModalOpen(false);
      toast.success('Assignment created successfully!');
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error('Error creating assignment.');
    }
  };
  

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const totalSubmissions = (assignments || []).reduce((total, assignment) => total + (assignment.submissions?.length || 0), 0);

  const isFormValid = newAssignment.title && newAssignment.deadline && newAssignment.description;

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : classData ? (
        <div className=''>
          <Typography variant="h4" gutterBottom>
            Class Details: {classData.title}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Enrollments</Typography>
                  <Typography variant="body1">{enrollmentCount}</Typography>  {/* Display enrollment count */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Assignments</Typography>
                  <Typography variant="body1">{assignments.length}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Total Assignment Submissions</Typography>
                  <Typography variant="body1">{totalSubmissions}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div className='mt-10 mx-auto w-3/12'>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              disabled={classData.status === 'rejected'}
            >
              Create Assignment
            </Button>
          </div>

          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="assignment-modal-title"
            aria-describedby="assignment-modal-description"
          >
            <div style={{ backgroundColor: 'white' }} className='w-4/12 mx-auto mt-20 p-6 rounded-xl'>
              <Typography variant="h6" id="assignment-modal-title">
                Add New Assignment
              </Typography>
              <TextField
                label="Assignment Title"
                fullWidth
                margin="normal"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              />
              <TextField
                label="Assignment Deadline"
                fullWidth
                margin="normal"
                type="date"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
              />
              <TextField
                label="Assignment Description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              />
              <Button
                variant="contained"
                className='w-4/12 bg-orange-500 mx-auto block rounded'
                onClick={handleCreateAssignment}
                disabled={!isFormValid}
              >
                Add Assignment
              </Button>
            </div>
          </Modal>
        </div>
      ) : (
        <Typography>Loading class details...</Typography>
      )}

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default SeeDetails;
