import React,{useState} from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Button,
  TextField,
  FormControl,
  Grid
} from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';





export default function ProfilePic(props) {

  const {data,setData , back, next} = props;

  const CloudName = process.env.REACT_APP_CLOUD_NAME;
  const UploadPreset = process.env.REACT_APP_CLOUD_PRESET;

  console.log("data",CloudName,UploadPreset);

//  const [ImageUrl, SetImageUrl] = useState('');

  function Upload(props) {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CloudName,
        uploadPreset: UploadPreset,
        multiple: false,
        cropping: true,
        showSkipCropButton: true,
        croppingAspectRatio: 1,
        folder: 'profile_pic',
        clientAllowedFormats: ['png', 'jpeg', 'mov', 'heic'],
        maxFileSize: 7000000,
        maxImageFileSize: 3500000,
        maxVideoFileSize: 40000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        sources: ['local', 'instagram', 'facebook'],
      },
      (err, res) => {
        if (err) console.log(err);
        if (res.event === 'success') {
          //  SetImageUrl(res.info.public_id);
            console.log(res.info.public_id);
            setData({...data , imgUrl:res.info.public_id})
            console.log(res);
            next();
        }
      }
    );

    const showWidget = () => {
      widget.open();
    };

    return (
      <div>
        <button onClick={showWidget}>
          {props.element} <br />
          {props.text}
        </button>
      </div>
    );
  }



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add Profile Pic
      </Typography>
      <Box display="flex" justifyContent="center" style={{margin : "10%"}}>
         <Upload
          element={<AddPhotoAlternateIcon />}
          text="Upload Image"
        />
      </Box>
      <Box display="flex" >
                            <Box flexGrow={1}>
                            <Button onClick={()=>{back()}} 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                      >
                        Back
        </Button>
                            </Box>
                            <Box >
                            <Button 
                        onClick={()=> {setData({...data , imgUrl:''}); next();}} 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                      >
                        Skip
                      </Button>
                            
                            </Box>
                          </Box>

        
                     
    </React.Fragment>
  );
}