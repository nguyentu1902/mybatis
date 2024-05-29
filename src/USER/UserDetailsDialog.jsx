import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserService from '../service/UserService';
import SnackbarUtils from '../components/SnackbarUtilsConfiguration';
import './css/UserDetailsDialog.css';

const UserDetailsDialog = ({ user, onClose, onSave, show, type, reloadUserList }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    useEffect(() => {
        if (type === 'update') {
            setEditedUser({ ...user });
        } else if (type === 'add') {
            setEditedUser({});
        }
    }, [user, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        setEditedUser({});
        onClose();
    }

    const handleSaveInDialog = (e) => {
        e.preventDefault();
        if (type === 'update') {
            UserService.updateUser(editedUser.id, editedUser).then(() => {
                onSave();
                onClose();
                // SnackbarUtils.success("Update user success!");
                reloadUserList();
            });

        }
        else if (type === 'add') {
            UserService.createUser(editedUser).then(() => {
                onSave();
                onClose();
                // SnackbarUtils.success("Create user success!");
                reloadUserList();
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{type === 'update' ? 'Update user' : 'Add new user'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {type === 'add' ? '' :
                        <Form.Group className="mb-3" controlId="formID">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="id"
                                name="ID"
                                value={editedUser.id}
                                onChange={handleChange}
                                disabled
                            />
                        </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={editedUser.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="contained" color="error" onClick={handleSaveInDialog} style={{ marginRight: '5px', backgroundColor: '#96cf85' }}>
                    {type === 'update' ? 'Update' : 'Add'}
                </Button>
                <Button variant="contained" onClick={handleClose} style={{ backgroundColor: '#dc3545' }}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailsDialog;
