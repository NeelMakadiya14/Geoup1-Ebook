import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from 'react-modal';
import $ from 'jquery';


const useStyles = makeStyles((theme) => ({
   head: {
        margin: "30px auto",
        display: "block",
        padding: "10px",
        fontSize: "40px",
   },
   input: {
       margin: "30px auto",
       display: "block",
       padding: "10px",
       fontSize : "20px",
       width : "400px",
       borderRadius: "5px",
       backgroundColor: "#edf5e1",
        
   },
   button: {
       margin: "20px auto",
       padding: "10px",
       fontSize: "20px",
       width: "100px",
       borderRadius: "5px",
       backgroundColor: "#05386b",
       color: "white",
       fontWeight: "bold",
       letterSpacing: "2px",
   }
  }));


export default function Admin(){
    const classes = useStyles();
    const [modalIsOpen,setIsOpen] = React.useState(true);
    const [password,setPassword] = React.useState("");

    const handleChange=(event) => {
        setPassword(event.target.value);
    }

    const handleCloseModal=(event) => {
        console.log(password);
        if(password !== "admin"){
                event.preventDefault();
                var error = "Incorrect Password."
                $("#login-error").html(error);
                $("#login-error").show();
        }
        else { 
        setIsOpen(false);}
    };

    const customStyles = {
        content : {
          position: 'relative',
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width : "500px",
          height : "500px",
          display : "flex",
          justifyContent : "center",
          textAlign : "center",
          borderRadius : "10px",
          background : "#5cdb95",
          color : "#05386b",
        }
      };


    return(
        <div className={classes.container}>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                contentLabel="Example Modal">

                
                <form >
                    <h1 className={classes.head}>Enter Password For Admin Login</h1>
                    {/* <input type="text" placeholder="Email" id="email" className={classes.input}  /> */}
                    <input type="password" placeholder="Password" id="pswrd" className={classes.input} 
                    onChange={handleChange}/>
                    <button onClick={handleCloseModal} className={classes.button}>Enter</button>
                    <p style={{display:"none", color:"red", fontSize:"20px"}} id="login-error"></p>
                </form>
            </Modal>

        <h1>hello</h1>

        </div>
    );
}