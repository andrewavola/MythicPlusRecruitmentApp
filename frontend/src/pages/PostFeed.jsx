import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/PostItem";
import { getPosts, reset } from "../features/posts/postSlice";
import PostForm from "../components/PostForm";
import { getCharacters } from "../features/characters/characterSlice";
import { Container, Col } from "react-bootstrap";
function PostFeed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const {character} = useSelector((state)=> state.character)
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    document.getElementById("app-body").style.backgroundImage =
      "url('https://wow.zamimg.com/images/tools/dragonflight-talent-calc/blizzard/talentbg-druid-guardian.jpg')";
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    if (user) dispatch(getCharacters());
    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1> Welcome to the Feed</h1>
      </section>
      <PostForm />
      <Container className="d-flex justify-content-center">
        <Col style={{borderRadius: '10px',backgroundColor: "rgba(13, 13, 13, 1)"}} md={7}>
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <h3>There are currently no posts</h3>
          )}
        </Col>
      </Container>
    </>
  );
}

export default PostFeed;
