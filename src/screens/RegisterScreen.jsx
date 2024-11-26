import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <FormContainer
        style={{
          background: '#ffffff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#00796b',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Register
        </h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label style={{ color: '#555' }}>Name</Form.Label>
            <Form.Control
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label style={{ color: '#555' }}>Email Address</Form.Label>
            <Form.Control
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label style={{ color: '#555' }}>Password</Form.Label>
            <Form.Control
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label style={{ color: '#555' }}>Confirm Password</Form.Label>
            <Form.Control
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='success'
            className='mt-3'
            style={{
              width: '100%',
              backgroundColor: '#00796b',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
            }}
          >
            Register
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
          <Col
            style={{
              textAlign: 'center',
              marginTop: '15px',
              fontSize: '14px',
              color: '#555',
            }}
          >
            Already have an account?{' '}
            <Link to='/login' style={{ color: '#00796b', fontWeight: 'bold' }}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
