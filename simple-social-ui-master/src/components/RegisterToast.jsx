import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


function RegisterToast({ registerToastShown, showRegisterToast }) {

  const [registerSuccessShown, setRegisterSuccess] = useState(false);
  const registerSuccessClose = () => setRegisterSuccess(false);

  const registerUser = async (event) => {
    event.preventDefault();
    const { usernameInput } = event.target.elements;
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(
        {
          "name": usernameInput.value
        }
      )
    });

    if (response.ok) {
      setRegisterSuccess(true);
      showRegisterToast(false);
    }
  }

  return (
    <>
      <Modal show={registerSuccessShown} onHide={registerSuccessClose}>
        <Modal.Header closeButton>
          <Modal.Title>User registered successfully! ✔️</Modal.Title>
        </Modal.Header>
      </Modal>

      <Toast
        show={registerToastShown}
        onClose={() => showRegisterToast(false)}
        bg="light"
        className="position-absolute end-0 bottom-0"
        style={{ transform: "translateY(calc(100% + 12px))" }}
      >
        <Toast.Body>
          <Form onSubmit={registerUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control name="usernameInput" type="text" autoFocus />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default RegisterToast;

