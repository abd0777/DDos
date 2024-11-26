import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #d1f7dc, #ffffff)',
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
            color: '#28a745',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Update Profile
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
              backgroundColor: '#28a745',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
            }}
          >
            Update
          </Button>

          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProfileScreen;
