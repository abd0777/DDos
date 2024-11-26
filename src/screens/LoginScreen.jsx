import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
            color: '#007bff',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Sign In
        </h1>

        <Form onSubmit={submitHandler}>
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

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='mt-3'
            style={{
              width: '100%',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
            }}
          >
            Sign In
          </Button>
        </Form>

        {isLoading && <Loader />}

        <Row className='py-3'>
          <Col style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ color: '#555' }}>
              New Doctor?{' '}
              <Link to='/register' style={{ color: '#007bff', fontWeight: 'bold' }}>
                Register
              </Link>
            </span>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default LoginScreen;
