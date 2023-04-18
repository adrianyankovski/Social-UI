import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';


function LoginToast({ loginToastShown, showLoginToast, setLoggedInUser }) {

  const logUserIn = async (event) => {
    event.preventDefault();
    const { usernameInput } = event.target.elements;
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(
        {
          "name": usernameInput.value
        }
      )
    });

    if (response.ok) {
      setLoggedInUser(usernameInput.value);
      showLoginToast(false);
    }
  }

  return (
    <>
      <Toast
        show={loginToastShown}
        onClose={() => showLoginToast(false)}
        bg="light"
        className="position-absolute end-0 bottom-0"
        style={{ transform: "translateY(calc(100% + 12px))" }}
      >
        <Toast.Body>
          <Form onSubmit={logUserIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control name="usernameInput" type="text" autoFocus />
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
}

export default LoginToast;
