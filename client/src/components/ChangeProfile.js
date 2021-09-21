import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
function ChangeProfile(props) {
    const id=props.match.params.id;
    const [selectedFile, setSelectedFile] = useState(null)
    const [user, setUser] = useState({name:'',roll:0,branch:'',mail:'',mob:0,year:0,pass:'',photo:{url:'',filename:''}})
    function submithandler(event)
    {
        event.preventDefault();
        console.log("hi from form")
        
        const formData = new FormData()
        formData.append(
            'file',
            selectedFile,
            selectedFile.name
        )
        axios.post('/users/'+id+'/profileUpdate', formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((data)=>props.history.push('/dashboard/'+id))
        .catch((err)=>console.log(err))
    }
    useEffect(() => {
        async function fetchAPI()
        {
            await axios.get('/users/'+id)
            .then((data)=>
            {
                user=setUser(data.data[0]);
                console.log(user.name);
            })
            .catch((err)=>console.log("oh"+err))
        }
        fetchAPI();
    }, [])
    return (
        <div style={{width:400,height:300,marginLeft:550,marginTop:200}}>
            <h3 style={{textAlign:'justify'}}>Profile Picture Change</h3>
           <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.photo.url} />
                <Card.Body>
                    <Card.Title>Profile Photo</Card.Title>
                {/* <Button variant="primary"></Button> */}
                <form onSubmit={submithandler}>
                    <input type="file" accept="image/*" onChange={(e)=>setSelectedFile(e.target.files[0])}/>
                {selectedFile && <Button style={{marginTop:"10px"}} type="submit" className="btn btn-primary btn-block" variant="primary">Update</Button>}
                </form>
            </Card.Body>
            </Card>
        </div>
    )
}

export default ChangeProfile
