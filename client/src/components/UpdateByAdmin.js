import React, {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
function Update(props) {
    const id=props.match.params.id;
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [subm, setSubm] = useState(false)
    console.log("hi from update component");
    useEffect(() => {
        async function fetchAPI()
        {
            await axios.get('/users/'+id)
            .then((users)=>
            {
                console.log("hi from fetchAPI");
                setUser(users.data[0]);
                console.log(user.name);
            })
            .catch((err)=>console.log("oh"+err))
        }
        fetchAPI();
    }, [])
    useEffect(() => {
        setFail(false);
        setSuccess(false);
        setSubm(true);
    }, [user])
    const osubmit=(event) => {
        event.preventDefault();
        axios.put('/users/'+id+'/edit',user)
        .then((data)=>{
            if(!data.data.code){
                setSuccess(true);
                console.log(data)
            }
            else
            {

                setFail(true);
            }
            window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
        })
        .catch((err)=>console.log(err))
    }
    return (
        <div className='container' style={{width:500,height:50,marginLeft:450,marginTop:20}}>
            <h1>Update your Profile</h1>
            {success && 
            <Alert variant="success">
                <Alert.Heading>Updated Successfully. </Alert.Heading>
            </Alert>}
            {fail && 
                <Alert variant="danger">
                    <Alert.Heading>Invalid Input Unable to Update</Alert.Heading>
                </Alert>
            }
            <Form onSubmit={osubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Roll No.</Form.Label>
                    <Form.Control type="name" value={user.roll} onChange={(e)=>setUser({...user,roll:e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Year of Graduation</Form.Label>
                    <Form.Control type="number" value={user.year} onChange={(e)=>setUser({...user,year:e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="mail" value={user.mail} onChange={(e)=>setUser({...user,mail:e.target.value})}/>
    
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control type="tel" value={user.mob} onChange={(e)=>setUser({...user,mob:e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control as="select" value={user.branch} onChange={(e)=>setUser({...user,branch:e.target.value})}>
                    <option>CSE</option>
                    <option>CE</option>
                    <option>ME</option>
                    <option>ECE</option>
                    <option>EE</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" className="btn btn-primary btn-block" type="submit">
                    Update
                </Button>
            </Form>
            
        </div>
    )
}

export default Update
