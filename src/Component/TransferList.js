import React, { useEffect, useState } from "react";
import { makeStyles, TextField, Grid, Button, Tooltip, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';

const firstData = [{ id: 1, name: 'TCS' }, { id: 2, name: 'Infosys' }, { id: 3, name: 'HCL' }, { id: 4, name: 'Capgemini' }, { id: 5, name: 'Wipro' }];
const secondData = [{ id: 6, name: 'Mphasis' }, { id: 7, name: 'Tech Mahindra' }];

const useStyles = makeStyles(() => ({
    deleteIcon: {
        color: 'red',
        cursor: 'pointer',
        height: 20,
        width: 20
    },
    cardWithHover: {
        padding: 5,
        margin: 8,
        height: 22,
        border: '1px solid black',
        backgroundColor: '#F5F5DC'
    },
    dataContainer: {
        border: '1px solid black',
        backgroundColor: '#F8F8FF',
        height: 300,
        overflowY: 'auto'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 50,
        marginLeft: 25,
        marginTop: 100
    }
}));

const TransferList = () => {
    const classes = useStyles();
    const [tempId, setTempId] = useState(null);
    const [tempData, setTempData] = useState(null);
    const [deleteCard, setDeleteCard] = useState(null);
    const [containerType, setContainerType] = useState(null);
    const [leftData, setLeftData] = useState(firstData);
    const [rightData, setRightData] = useState(secondData);
    const [open, setOpen] = useState(false);
    const [addLeftSide, setAddLeftSide] = useState(false);
    const [addRightSide, setAddRightSide] = useState(false);
    const [addFieldName, setAddFieldName] = useState('');

    const handleClose = () => {
        setOpen(false);
        setTempData(null);
        setTempId(null);
        setDeleteCard(null);
        setContainerType(null);
    };

    const selectCard = (id, type) => {
        setTempId(id);
        setContainerType(type);
    };

    const moveCardToRight = () => {
        setLeftData(leftData.filter(item => item.id !== tempId));
        const item = leftData.find(item => item.id === tempId);
        setRightData(prevState => [...prevState, item]);
        setTempId(null);
        setContainerType(null);
        setAddLeftSide(false);
        setAddRightSide(false);
    };

    const moveCardToLeft = () => {
        setRightData(rightData.filter(item => item.id !== tempId));
        const item = rightData.find(item => item.id === tempId);
        setLeftData(prevState => [...prevState, item]);
        setTempId(null);
        setContainerType(null);
        setAddLeftSide(false);
        setAddRightSide(false);
    };

    const deleteSelectedCard = (data) => {
        setOpen(true);
        setTempData(data);
        setTempId(null);
        setDeleteCard(null);
        setContainerType(null);
        setAddLeftSide(false);
        setAddRightSide(false);
    };

    const deleteData = () => {
        if (containerType === 'left') {
            setLeftData(leftData.filter(item => item.id !== tempId));
        }
        else if (containerType === 'right') {
            setRightData(rightData.filter(item => item.id !== tempId));
        };
        setOpen(false);
        setTempData(null);
        setTempId(null);
        setDeleteCard(null);
        setContainerType(null);
    };

    const moveLeftToRight = () => {
        setRightData(prevState => [...prevState, ...leftData]);
        setLeftData([]);
        setAddLeftSide(false);
        setAddRightSide(false);
    };

    const moveRightToLeft = () => {
        setLeftData(prevState => [...prevState, ...rightData]);
        setRightData([]);
        setAddLeftSide(false);
        setAddRightSide(false);
    };

    const combineData = [...leftData, ...rightData];
    const maxId = combineData.reduce((max, cur) => (max.id > cur.id ? max : cur));

    const addLeftSideData = () => {
        setLeftData(prevState => [...prevState, { id: (maxId.id + 1), name: addFieldName }]);
        setAddLeftSide(false);
        setAddFieldName('');
    };

    const addRightSideData = () => {
        setRightData(prevState => [...prevState, { id: (maxId.id + 1), name: addFieldName }]);
        setAddRightSide(false);
        setAddFieldName('');
    };

    const addLeftInputValue = () => {
        setAddLeftSide(true);
        setAddRightSide(false);
    };

    const addRightInputValue = () => {
        setAddLeftSide(false);
        setAddRightSide(true);
    };

    return (
        <div style={{ marginTop: 100 }}>
            <Grid container spacing={1}>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                    <div>
                        {addLeftSide === false ? <Button onClick={addLeftInputValue}>+ Add New</Button> :
                            <div style={{ marginBottom: 10 }}><TextField onChange={(e) => setAddFieldName(e.target.value)} style={{ width: 180 }} id="standard-basic" placeholder="Enter name" variant="standard" />
                                {addFieldName !== '' ? <Button variant="outlined" style={{ color: 'green' }} size="small" onClick={addLeftSideData}>Save</Button>
                                    : <Button variant="outlined" size="small" style={{ color: 'red' }} onClick={() => setAddLeftSide(false)}>X</Button>}
                            </div>}
                    </div>

                    <div className={classes.dataContainer}>
                        {leftData.length !== 0 ? leftData && leftData.map((f, i) =>
                            <p onClick={() => selectCard(f.id, 'left')} key={i} onMouseEnter={() => setDeleteCard(f.id)} onMouseLeave={() => setDeleteCard(null)} className={classes.cardWithHover} style={tempId === f.id ? { backgroundColor: '#FFDAB9' } : { backgroundColor: '#F5F5DC' }}>
                                <span style={{ float: 'left' }}>{f.name}</span> {deleteCard === f.id && tempId !== deleteCard ? <span style={{ float: 'right' }}>
                                    <Tooltip title="Delete" arrow><DeleteIcon className={classes.deleteIcon} onClick={() => deleteSelectedCard(f)} /></Tooltip></span> : ''}</p>
                        ) : <div style={{ marginTop: 110 }}><div><WarningIcon style={{ color: 'red' }} /></div> No Record!</div>}</div>
                </Grid>
                <Grid item xs={1}>
                    <div className={classes.buttonContainer}>
                        <Button variant="outlined" size="small" color="secondary" disabled={leftData.length === 0} onClick={moveLeftToRight}>{'>>'}</Button>
                        <Button variant="outlined" size="small" color="primary" onClick={moveCardToRight} disabled={containerType === 'left' ? false : true}>{'>'}</Button>
                        <Button variant="outlined" size="small" color="primary" onClick={moveCardToLeft} disabled={containerType === 'right' ? false : true}>{'<'}</Button>
                        <Button variant="outlined" size="small" color="secondary" disabled={rightData.length === 0} onClick={moveRightToLeft}>{'<<'}</Button>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div>
                        {addRightSide === false ? <Button onClick={addRightInputValue}>+ Add New</Button> :
                            <div style={{ marginBottom: 10 }}><TextField onChange={(e) => setAddFieldName(e.target.value)} style={{ width: 180 }} id="standard-basic" placeholder="Enter name" variant="standard" />
                                {addFieldName !== '' ? <Button variant="outlined" size="small" style={{ color: 'green' }} disabled={addFieldName === ''} onClick={addRightSideData}>Save</Button>
                                    : <Button variant="outlined" size="small" style={{ color: 'red' }} onClick={() => setAddRightSide(false)}>X</Button>}
                            </div>}
                    </div>
                    <div className={classes.dataContainer}>
                        {rightData.length !== 0 ? rightData && rightData.map((f, i) =>
                            <p onClick={() => selectCard(f.id, 'right')} key={i} onMouseEnter={() => setDeleteCard(f.id)} onMouseLeave={() => setDeleteCard(null)} className={classes.cardWithHover} style={tempId === f.id ? { backgroundColor: '#FFDAB9' } : { backgroundColor: '#F5F5DC' }}>
                                <span style={{ float: 'left' }}>{f.name}</span> {deleteCard === f.id && tempId !== deleteCard ? <span style={{ float: 'right' }}><Tooltip title="Delete" arrow><DeleteIcon onClick={() => deleteSelectedCard(f)} className={classes.deleteIcon} /></Tooltip></span> : ''}</p>
                        ) : <div style={{ marginTop: 110 }}><div><WarningIcon style={{ color: 'red' }} /></div> No Record!</div>}
                    </div>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>

            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirmation!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{tempData && tempData.name}</span> ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteData}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default TransferList;