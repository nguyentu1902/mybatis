import React, { useEffect, useState } from 'react';
import UserService from '../service/UserService';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Clear } from "@mui/icons-material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UserDetailsDialog from './UserDetailsDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import CustomTablePagination from '../components/CustomTablePagination';
import './css/UserList.css'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showDialogUser, setshowDialogUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [dialogType, setDialogType] = useState('');
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        if (page > 0 && page >= Math.ceil(users.length / rowsPerPage))
            setPage(0);
    }, [users, rowsPerPage, page]);

    const initData = async () => {
        const users = await UserService.getAllUsers();
        setUsers(users?.data || []);
        setSelectedUser(users?.data || []);
    };

    const handleClose = () => {
        setShowConfirmDelete(false);
        setSelectedUser(null);
    };

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setDialogType('update');
        setshowDialogUser(true);
    };

    const handleDelete = (id) => {
        const userToDelete = users.find((user) => user.id === id);
        setSelectedUser(userToDelete);
        setShowConfirmDelete(true);
        setUserIdToDelete(id);
    };

    const confirmDelete = async () => {
        if (userIdToDelete) {
            await UserService.deleteUser(userIdToDelete);
            setShowConfirmDelete(false);
            initData();
        }
    }

    const handleSave = () => {
        initData();
        setshowDialogUser(false);
    };

    const handleAddUserClick = () => {
        setSelectedUser({});
        setDialogType("add");
        setshowDialogUser(true);
    };

    const handleChangeSearch = (event) => {
        setSearchValue(event.target.value);
        UserService.getAllUserByNameContains(event.target.value).then((response) => {
            setUsers(response.data);
        });
    };

    const handleClearSearch = () => {
        setSearchValue("");
        initData();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    return (
        <div className="user-list-container">
            <h2 className="title-user-list">User List</h2>
            <div style={{ display: 'flex' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddUserClick}
                    startIcon={<PersonAddAltIcon />}
                    style={{
                        marginRight: "auto",
                        marginBottom: "20px",
                        fontWeight: "bold",
                        color: "black",
                        backgroundColor: "#76a369"
                    }}
                >
                    Add User
                </Button>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="Search by name..."
                    value={searchValue}
                    onChange={handleChangeSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <IconButton
                                style={{ background: "white" }}
                                color="default"
                                size="small"
                                sx={{
                                    visibility: searchValue ? "visible" : "hidden",
                                }}
                                onClick={handleClearSearch}
                            >
                                <Clear fontSize="small" />
                            </IconButton>
                        ),
                    }}
                    style={{ marginBottom: "20px", width: "30%" }}
                />
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="user table">
                    <TableHead className='table-header'>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0 ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : users).map((user) => (
                            <TableRow
                                key={user.id}
                                onDoubleClick={() => handleViewDetails(user)}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f0f7ee",
                                        opacity: 0.8,
                                    }
                                }}
                            >
                                <TableCell>
                                    <Avatar>{user.name.charAt(0)}</Avatar>
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewDetails(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <tr style={{ height: 41 * emptyRows }}>
                                <td colSpan={3} aria-hidden />
                            </tr>
                        )}
                    </TableBody>

                </Table>
                {selectedUser && (
                    <UserDetailsDialog
                        user={selectedUser}
                        onClose={() => setshowDialogUser(false)}
                        onSave={() => handleSave}
                        show={showDialogUser}
                        type={dialogType}
                        reloadUserList={initData}
                    />
                )}
            </TableContainer>

            <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete {selectedUser?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="error" onClick={confirmDelete} style={{ color: 'black', textTransform: 'none', marginRight: '5px', backgroundColor: '#96cf85' }}>
                        Delete
                    </Button>
                    <Button variant="contained" onClick={handleClose} style={{ color: 'black', textTransform: 'none', backgroundColor: '#dc3545' }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                <CustomTablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={10}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                        select: {
                            'aria-label': 'rows per pagee',
                        },
                        actions: {
                            showFirstButton: true,
                            showLastButton : true,
                            slots: {
                                firstPageIcon: FirstPageRoundedIcon,
                                lastPageIcon: LastPageRoundedIcon,
                                nextPageIcon: ChevronRightRoundedIcon,
                                backPageIcon: ChevronLeftRoundedIcon,
                            },
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};


export default UserList;
