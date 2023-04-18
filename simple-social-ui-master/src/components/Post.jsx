import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';


function Post({ id, author, content, likes, deletePost, likePost, showDeleteButton }) {
  return (
    <Card>
      <Card.Header>
        <Stack direction="horizontal" gap={3} className="text-muted">
          <span>{author}</span>
          <span className="ms-auto"></span>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={3}>
          <span>{likes} Likes</span>
          <span className="ms-auto"></span>
          <Form id={id}>
            <Button variant="primary" className="me-2" onClick={() => likePost(id)}>Like 👍</Button>
            {
              showDeleteButton ?
                <Button variant="danger" onClick={() => deletePost(id)}>Delete ✖️</Button>
              :
                <span></span>
            }
          </Form>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default Post;
