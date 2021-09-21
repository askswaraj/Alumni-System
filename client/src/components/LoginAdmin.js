import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import AuthContext from '../context/AuthContext';

function LoginAdmin(props) {
    const [mob, setMob] = useState('');
    const {getLoggedAdmin}=useContext(AuthContext);
const [password, setpassword] = useState('');
const [msg, setMsg] = useState(false);
const submitchange=(event)=>{
    event.preventDefault();
         axios.post('/admin/login',{mob,password})
        .then((data)=>{
            if(!data.data.msg)
            {
                getLoggedAdmin();
                props.history.push('/admindashboard') ;
            }
            else
            {
                setMsg(true);
            }   
            
        })
        .catch((err)=>console.log("Failed to send login request  "+err))
}
useEffect(()=>{
    setMsg(false);    // when user changes the input field, Invalid msg is vanished
},[mob,password])
    return (
        <div>
        
        <div style={{width:400,height:300,marginLeft:500,marginTop:200}}>
          <form onSubmit={submitchange}>
                <h3 style={{textAlign:'center'}}>Admin Sign In</h3>

                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="text" className="form-control" placeholder="Enter Mobile Number" value={mob} onChange={(event)=>setMob(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                     <a href="/admin/loginOTP">Log In Using OTP?</a>
                </p>
            </form>
            {msg && <Alert variant="danger" >
				<Alert.Heading>Incorrect Username or Password</Alert.Heading>	
	  	</Alert>}
            </div>


        
          
            
    </div>
    )
}

export default LoginAdmin
