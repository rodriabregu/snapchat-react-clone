import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from 'uuid';
import { db, storage } from './firebase';
import firebase from 'firebase';
import './Preview.css';

const Preview = () => {
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();

    const closePreview = () => {
        dispatch(resetCameraImage());
        history.replace('/');
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url');

        uploadTask.on('state_changed', null, (erorr) => {
            console.log(error)
        }, 
        () => {
            storage
                .ref('posts')
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db.collection('posts').add({
                        imageUrl: url,
                        username: 'Rodri rey',
                        read: false,
                        //profile pic
                        timestamp: firebase.firestore.FieldValue.servertTimestamp(),
                    });
                    history.replace('/chats')
                })
        }
        );
    }

    useEffect(() => {
        if(!cameraImage) return history.replace('/');
    }, [cameraImage, history])

    return (
        <div className='preview'>
            <CloseIcon 
            className='preview__close'
            onClick={closePreview}
            />
            <div className='preview__toolbarRight'>
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt='previewImage'/>
            <div onClick={sendPost} className='preview__footer'>
                <h2>Send now</h2>
                <SendIcon fontSize='small' className='preview__sendIcon' />
            </div>
        </div>
    )
}

export default Preview;
