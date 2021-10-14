import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";
import './WebcamCapture.css';

const videoContraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    // const [image, setImage] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview');
    }, [webcamRef]);

    return (
        <div className='webcamCapture'>
            <Webcam 
                audio={false}
                height={videoContraints.height}
                width={videoContraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoContraints={videoContraints}
            />
            <RadioButtonUncheckedIcon 
                className='webcamCapture__button'
                onClick={capture}
                fontSize='large'
            />
        </div>
    )
};

export default WebcamCapture;
