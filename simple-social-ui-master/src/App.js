import './App.css';

import LoginToast from './components/LoginToast';
import RegisterToast from './components/RegisterToast';
import Post from './components/Post';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';


function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const refreshPosts = () => {
    fetch("http://localhost:3000/posts", { credentials: "include" })
      .then(response => response.json())
      .then(existingPosts => {
        if (Array.isArray(existingPosts)) {
          setPosts(existingPosts);
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    refreshPosts();
  }, [loggedInUser])

  const [loginToastShown, showLoginToast] = useState(false);
  const [registerToastShown, showRegisterToast] = useState(false);

  const toggleLoginToast = () => {
    showRegisterToast(false);
    showLoginToast(!loginToastShown);
  }
  const toggleRegisterToast = () => {
    showLoginToast(false);
    showRegisterToast(!registerToastShown);
  }

  const logUserOut = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (response.ok) {
      setLoggedInUser(null);
    }
  }

  const createPost = async (event) => {
    event.preventDefault();
    const { contentInput } = event.target.elements;
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(
        {
          "content": contentInput.value
        }
      )
    });

    if (response.ok) {
      refreshPosts();
    }
  }
  
  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (response.ok) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
    }
  }

  const likePost = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (response.ok) {
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          post.likes++
        }
        return post;
      });
      setPosts(updatedPosts);
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="position-relative">
          <Navbar.Brand href="#">Simple social UI</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Form className="d-flex" onSubmit={logUserOut}>
            {
              loggedInUser ?
                <>
                  <Navbar.Text className="me-3">{loggedInUser}</Navbar.Text>
                  <Button variant="outline-dark" type="submit">Logout</Button>
                </>
              :
                <>
                  <Button
                    variant="outline-success"
                    className="me-2"
                    onClick={toggleLoginToast}
                    style={{ minWidth: "65.2833px" }}
                  >
                    {loginToastShown ? "❌" : "Login"}
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={toggleRegisterToast}
                    style={{ minWidth: "85.1px" }}
                  >
                    {registerToastShown ? "❌" : "Register"}
                  </Button>
                </>
            }
            </Form>
          </Navbar.Collapse>
          <LoginToast
            loginToastShown={loginToastShown}
            showLoginToast={showLoginToast}
            setLoggedInUser={setLoggedInUser} />

          <RegisterToast
            registerToastShown={registerToastShown}
            showRegisterToast={showRegisterToast} />
        </Container>
      </Navbar>

      {
        loggedInUser ?
          <Container className="position-relative my-5" style={{ maxWidth: "576px" }} fluid>
            <Form onSubmit={createPost}>
              <Form.Group className="mb-3">
                <Form.Label>Create new post</Form.Label>
                <Form.Control as="textarea" name="contentInput" rows={3} />
              </Form.Group>
              <Button variant="primary" type="submit">Post</Button>
            </Form>
            
            <h1 className="my-4">Recent posts</h1>
            <Stack gap={3}>
              {
                posts.map(post => {
                  return (
                    <Post
                      key={post.id}
                      id={post.id}
                      author={post.userName}
                      content={post.content}
                      likes={post.likes}
                      likePost={likePost}
                      deletePost={deletePost}
                      showDeleteButton={post.userName === loggedInUser} />
                  );
                })
              }
            </Stack>
          </Container>
        :
          <h1 className="text-center m-5">Log in or register an account to see posts!</h1>
      }
    </>
  );
}

export default App;
