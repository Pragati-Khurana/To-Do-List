import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();

    const signUpUser = async (e) => {
        e.preventDefault();
        // fetch("http://192.168.0.142:5000/user", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({name, email, password})
        // }).then((res) => res.json()).then((resp)=>console.log(resp));

        let res = await fetch("http://192.168.0.142:5000/user", {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        });

        res = await res.json();
        console.warn(res);
        
        // Navigate('/main');
    }

    useEffect(() => {
        
    }, [])

  return (
    <div className='container'>
      <div className='title'>Sign Up</div>  
      <Form className='signup-form' onSubmit={(e)=>signUpUser(e)}>
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
             Submit
        </Button>
    </Form>
    </div>
  )
}

export default SignUp
