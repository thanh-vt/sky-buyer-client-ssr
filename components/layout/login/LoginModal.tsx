import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/userSlice';

const schema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().min(6).required(),
  // .matches(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/, 'Invalid password pattern')
  // .required(),
});

export function LoginModal(
  props: { show?: boolean } = { show: false }
): ReactElement {
  const [show, setShow] = useState(props.show);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className={'mx-2'}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Login
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(val) => {
              dispatch(login(val));
            }}
            validationSchema={schema}
            initialValues={{
              username: '',
              password: '',
              remember: false,
            }}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={false}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username/Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="username"
                    placeholder="Enter email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isValid={!errors.username}
                    isInvalid={!!errors.username}
                  />
                  <Form.Text className="text-muted">
                    We&apos;ll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                {touched.username && errors.username && (
                  <Alert variant={'danger'}>{errors.username}</Alert>
                )}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isValid={!errors.password}
                    isInvalid={!!errors.password}
                  />
                </Form.Group>
                {touched.password && errors.password && (
                  <Alert variant={'danger'}>{errors.password}</Alert>
                )}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    name="remember"
                    label="Check me out"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
