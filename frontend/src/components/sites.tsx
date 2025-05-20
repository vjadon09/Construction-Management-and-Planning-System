import { useState } from 'react';
import {Col, Button, Form, Tab, Tabs, Container, Stack} from 'react-bootstrap';
import {Post} from "./models.ts";
import {useParams} from "react-router-dom";

interface PostsProps {
    project_posts: Post[]
}

const Posts = ({project_posts}: PostsProps) => {
    const [posts, setPosts] = useState(project_posts);
    const [postText, setPostText] = useState('');
    const [author, setAuthor] = useState('');
    const [dueDate, setDueDate] = useState(Date.UTC.prototype);
    let { projectID } = useParams();
    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/site/${projectID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: posts.length + 1,
                    text: postText,
                    author: author,
                    status: 'Draft'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const newPost = await response.json();
            setPosts([...posts, newPost[newPost.length-1]]);
            setPostText('');
            setAuthor('');
            setDueDate('')
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handlePostDelete = async ( postId: number) => {
        try {
            const response = await fetch(`http://localhost:8000/site/${projectID}?post_id=${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            const updatedPosts = posts.filter(post => post.id !== postId);
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
        console.log(postId)
    };

    const handlePostApprove = async (postId: number) => {
        const updated_post = posts.find(post => post.id === postId)
        if (!updated_post) {
            throw new Error('Failed to update post');
        }
        updated_post.status = 'Approved';
        try {
            const response = await fetch(`http://localhost:8000/site/${projectID}/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updated_post),
            });

            if (!response.ok) {
                throw new Error('Failed to approve post');
            }


            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return updated_post
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error approving post:', error);
        }
    };


    return (
        <Col className={"h-75 bg-transparent"}>
            <h4 className="text-center m-3 pb-3 text-primary">View and Create Posts</h4>
            <Tabs defaultActiveKey="viewPosts" className="mb-4 justify-content-center">
                <Tab eventKey="viewPosts" title="View Posts">
                    {posts.map(post => (
                        <Container key={post.id} className={"mb-2 p-2 border-bottom border-end border-5 bg-light-subtle"}>
                            <Stack direction={"horizontal"}
                                   className={"rounded border-bottom border-end border-2 border-opacity-50 border-success-subtle m-2 p-2 bg-light-subtle"}>
                                <h6 className={"w-100 text-success text-center"}>{post.text}</h6>
                            </Stack>
                            <Stack direction={"horizontal"}
                                   className={"rounded border-bottom border-end border-2 border-opacity-50 pt-1 border-secondary-subtle m-2 bg-secondary-subtle"}>
                                <Stack direction="horizontal" gap={3} className={"w-100 justify-content-evenly"}>
                                    <p>By: {post.author}</p>
                                    <div className="vr"/>
                                    <p>Status: {post.status}</p>
                                </Stack>
                            </Stack>
                            <Stack direction={"horizontal"} className={"w-100 align-items-center justify-content-evenly"}>
                                <Button variant="outline-success" disabled={post.status === "Approved"} onClick={() => handlePostApprove(post.id)}>Approve</Button>
                                <Button variant="outline-danger" onClick={() => handlePostDelete(post.id)}>Delete</Button>
                            </Stack>
                        </Container>
                    ))}
                </Tab>
                <Tab eventKey="createPost" title="Create Post">
                    <Form onSubmit={handleCreatePost} className="m-5">
                        <Form.Group controlId="formPostText" className={"m-3"}>
                            <Form.Label className={"me-3"}>Site Text</Form.Label>
                            <Form.Control className={"mb-2 w-75"} type="text" placeholder="Enter Text" as="textarea" rows={3} value={postText} onChange={(e) => setPostText(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formAuthor" className={"m-3"}>
                            <Form.Label className={"me-3"}>Author</Form.Label>
                            <Form.Control className={"mb-2 w-50"} type="text" placeholder="Enter Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formDueDate" className={"m-3"}>
                            <Form.Label className={"me-3"}>Due Date</Form.Label>
                            <Form.Control className={"mb-2 w-50"} type="date" placeholder="Enter Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </Form.Group>
                        <Button className={"m-3"} variant="success" type="submit">
                            Create Site
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </Col>

    );
};

export default Posts;
