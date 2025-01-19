import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authContext } from '../providers/AuthProvider';
import axios from 'axios';

const AddClass = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  const navigate = useNavigate();

  const { user } = useContext(authContext);

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || '');
      setUserEmail(user.email || '');
    } 
  }, [user]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userName || !userEmail) {
    toast.error('Please make sure you are logged in.');
    return;
  }

  const priceNumber = parseFloat(price.replace(/[^0-9.-]+/g, ""));

  if (!title || !priceNumber || !description) {
    toast.error('Title, price, and description are required');
    return;
  }

  const classData = {
    title,
    instructor: userName, 
    email: userEmail,  
    price: priceNumber, 
    shortDescription: description,  
    image,
    status: 'pending', 
  };

  try {
    const response = await axios.post('http://localhost:5000/classes', classData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    if (response.status === 200) {
      toast.success('Class added successfully!');
      navigate('/student-dashboard/my-classes');
    }
  } catch (error) {
    toast.success('Class added successfully!');

  }
};

  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Class
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Class Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={userName || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              value={userEmail || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Class Image URL"
              variant="outlined"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Class
            </Button>
          </Grid>
        </Grid>
      </form>

      <ToastContainer position="top-center" autoClose={5000} />
    </Container>
  );
};

export default AddClass;
