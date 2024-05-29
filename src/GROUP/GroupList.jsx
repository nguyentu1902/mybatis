import React, { useEffect, useState } from 'react';
import GroupService from '../service/GroupService';
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Clear } from "@mui/icons-material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupDetailsDialog from './GroupDetailsDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import './css/GroupList.css';

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showDialogGroup, setShowDialogGroup] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [dialogType, setDialogType] = useState('');
    const [groupIdToDelete, setGroupIdToDelete] = useState(null);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const groups = await GroupService.getAllGroups();
        setGroups(groups?.data || []);
    };

    const handleClose = () => {
        setShowConfirmDelete(false);
        setSelectedGroup(null);
    };

    const handleViewDetails = (group) => {
        setSelectedGroup(group);
        setDialogType('update');
        setShowDialogGroup(true);
    };

    const handleDelete = (id) => {
        const groupToDelete = groups.find((group) => group.id === id);
        setSelectedGroup(groupToDelete);
        setShowConfirmDelete(true);
        setGroupIdToDelete(id);
    };

    const confirmDelete = async () => {
        if (groupIdToDelete) {
            await GroupService.deleteGroup(groupIdToDelete);
            setShowConfirmDelete(false);
            initData();
        }
    }

    const handleSave = () => {
        initData();
        setShowDialogGroup(false);
    };

    const handleAddGroupClick = () => {
        setSelectedGroup({});
        setDialogType("add");
        setShowDialogGroup(true);
    };

    const handleChangeSearch = (event) => {
        setSearchValue(event.target.value);
        GroupService.getAllGroupByNameContains(event.target.value).then((response) => {
            setGroups(response.data);
        });
    };

    const handleClearSearch = () => {
        setSearchValue("");
        initData();
    }

    return (
        <div className="group-list-container">
            <h2 className="text-center">Group List</h2>
            <div style={{ display: 'flex' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddGroupClick}
                    startIcon={<PersonAddAltIcon />}
                    style={{
                        marginRight: "auto",
                        marginBottom: "20px",
                        fontWeight: "bold",
                        color: "black",
                        backgroundColor: "#76a369"
                    }}
                >
                    Add Group
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
                <Table aria-label="group table">
                    <TableHead className='table-header'>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {groups.map((group) => (
                            <TableRow
                                key={group.id}
                                onDoubleClick={() => handleViewDetails(group)}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f0f7ee",
                                        opacity: 0.8,
                                    }
                                }}
                            >
                                <TableCell>{group.name}</TableCell>
                                <TableCell>{group.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewDetails(group)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(group.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {selectedGroup && (
                    <GroupDetailsDialog
                        group={selectedGroup}
                        onClose={() => setShowDialogGroup(false)}
                        onSave={() => handleSave}
                        show={showDialogGroup}
                        type={dialogType}
                        reloadGroupList={initData}
                    />
                )}
            </TableContainer>

            <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete {selectedGroup?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="error" onClick={confirmDelete} style={{ color: 'black', textTransform: 'none', marginRight: '5px', backgroundColor: '#96cf85' }}>
                        Delete
                    </Button>
                    <Button variant="contained" onClick={handleClose} style={{ color: 'black', textTransform: 'none', backgroundColor: '#dc3545' }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GroupList;
