import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormControlLabel, Switch } from '@mui/material';
import './css/profile.css';
import { Navigate } from 'react-router-dom';

const ProfilePage = (props) => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [logout, setLogout] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        number: '',
    });

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/auth?userId=${props.user._id}`);
            const data = await response.json();
            const user = data.user;

            setUser(user);
            setFormData({
                username: user.username,
                email: user.email,
                password: '',
                address: user.address,
                number: user.number,
            })
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log('here')
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...formData,
                    userId: "6656c891f67c292bcce8e1b2",
                }),
            })

            const data = await response.json();
            setUser(data.user);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='profile-page'>
            {logout && <Navigate to="/" />}
            <Typography variant="h4">Profile</Typography>
            <div className='profile-box'>
                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    value={formData.username}
                    onChange={handleChange}
                    className='profile-input'
                    disabled={!isEditing}
                    InputProps={{ style: { color: '#333' } }} 
                    
                />
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    className='profile-input'
                    disabled={!isEditing}
                    InputProps={{ style: { color: '#333' } }} 
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    className='profile-input'
                    placeholder="Enter new password"
                    disabled={!isEditing}
                    InputProps={{ style: { color: '#333' } }} 
                />
                <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    value={formData.address}
                    onChange={handleChange}
                    className='profile-input'
                    disabled={!isEditing}
                />
                <TextField
                    label="Number"
                    name="number"
                    variant="outlined"
                    value={formData.number}
                    onChange={handleChange}
                    className='profile-input'
                    disabled={!isEditing}
                />
                <FormControlLabel
                    control={<Switch checked={user.role === 'admin'} disabled />}
                    label={`Role: ${user.role}`}
                />
                {isEditing ? (
                    <Button variant="contained" color="primary" onClick={handleSave} className='profile-button'>
                        Save
                    </Button>
                ) : (
                    <>
                    <Button variant="contained" color="primary" onClick={handleEdit} className='profile-button'>
                        Edit
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        props.handleLogout();
                        setLogout(true);
                    }} className='profile-button'>
                        Logout
                    </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
