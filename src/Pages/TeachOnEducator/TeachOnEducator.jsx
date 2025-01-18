import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import Headlines from './../Shared/Headlines/Headlines';
import { authContext } from '../../providers/AuthProvider';

const TeachOnEducator = () => {
    const { user } = useContext(authContext); // Get logged-in user from context
    const queryClient = useQueryClient();
    const [status, setStatus] = useState('');
    
    const categories = [
        'Web Development',
        'Digital Marketing',
        'Data Science',
        'Machine Learning',
        'Cybersecurity'
    ];

    axios.defaults.baseURL = 'http://localhost:5000';

    const mutation = useMutation({
        mutationFn: (newRequest) => axios.post('/api/teacher-request', newRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
            setStatus('pending');
            toast.success('Request submitted successfully!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        },
        onError: () => {
            toast.error('Failed to submit request. Please try again.', {
                position: 'top-center',
                autoClose: 3000
            });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const requestData = Object.fromEntries(formData.entries());

        requestData.status = 'pending';
        requestData.email = user.email;  // Add the logged-in user's email
        requestData.image = user.photoURL;  // Add the logged-in user's image URL
        requestData.userId = user.uid;  // Add the unique user ID to track the request

        mutation.mutate(requestData, {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    useEffect(() => {
        // Optionally, you can add logic to check if the user is logged in or redirect them.
        if (!user) {
            // Redirect to login page or show a message (depending on the context)
            toast.error('You must be logged in to apply for a teaching position.');
        }
    }, [user]);

    return (
        <>
            <Headlines heading={"Become an Educator"} subHeading={"Turn Your Expertise into Impactful Teaching"} />

            <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded-2xl">
                <ToastContainer />
                {status === 'approved' ? (
                    <p className="text-green-500">You are now a teacher. This form is no longer available.</p>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <TextField
                                    label="Name"
                                    name="name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    className="border p-2"
                                    value={user?.displayName || ''} // Show user's name (read-only)
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    className="border p-2 bg-gray-100"
                                    value={user?.email || ''} // Show user's email (read-only)
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <FormControl fullWidth required variant="outlined" className="border p-2">
                                    <InputLabel>Experience Level</InputLabel>
                                    <Select
                                        name="experience"
                                        label="Experience Level"
                                        defaultValue="beginner"
                                    >
                                        <MenuItem value="beginner">Beginner</MenuItem>
                                        <MenuItem value="mid-level">Mid-Level</MenuItem>
                                        <MenuItem value="experienced">Experienced</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="mb-4">
                                <TextField
                                    label="Title"
                                    name="title"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    className="border p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <FormControl fullWidth required variant="outlined" className="border p-2">
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        label="Category"
                                        defaultValue={categories[0]}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className='w-full flex'>
                                <button type="submit" className="w-5/12 rounded-xl btn mx-auto bg-orange-500 text-white p-2 ">
                                    Submit for Review
                                </button>
                            </div>
                        </form>
                    </>
                )}
                {status === 'rejected' && (
                    <div className="w-full flex">
                        <button onClick={() => setStatus('pending')} className="mt-4 w-5/12 bg-red-500 text-white p-2 rounded">
                            Request Another
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default TeachOnEducator;
