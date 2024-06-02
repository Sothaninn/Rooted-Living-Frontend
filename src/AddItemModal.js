import React, { useState, useEffect } from 'react';
import {
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import './App.css';

const AddItemModal = ({ open, handleClose, handleSave, productData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    type: 'tool', // Default type
  });

  useEffect(() => {
    if (productData) {
      setFormData(productData);
    }
  }, [productData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    setFormData({
      name: '',
      price: '',
      description: '',
      quantity: '',
      type: 'tool',
    });
    handleClose();
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      quantity: '',
      type: 'tool',
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="add-item-modal">
      {/* <div className="inner-add-item-modal" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}> */}
      <div className="inner-add-item-modal">
      <h2>{productData ? 'Edit Item' : 'Add New Item'}</h2>
        <TextField name="name" label="Name" fullWidth margin="normal" value={formData.name} onChange={handleChange} />
        <TextField name="price" label="Price" fullWidth margin="normal" type="number" value={formData.price} onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth margin="normal" multiline rows={4} value={formData.description} onChange={handleChange} />
        <TextField name="quantity" label="Quantity" fullWidth margin="normal" type="number" value={formData.quantity} onChange={handleChange} />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <MenuItem value="tool">Tool</MenuItem>
            <MenuItem value="plant">Plant</MenuItem>
            <MenuItem value="seed">Seed</MenuItem>
            <MenuItem value="planter">Planter</MenuItem>
          </Select>
        </FormControl>
         <Button variant="contained" color="primary" onClick={handleSubmit}>{productData ? 'Save Changes' : 'Add Item'}</Button>
        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default AddItemModal;
