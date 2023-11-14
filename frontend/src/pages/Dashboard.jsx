import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CharacterForm from "../components/CharacterForm";
import Spinner from "../components/Spinner";
import { getCharacters } from "../features/characters/characterSlice";
import CharacterItem from "../components/CharacterItem";
import PostItem from "../components/PostItem";
import { getPosts } from "../features/posts/postSlice";
import { Container, Row, Col } from "react-bootstrap";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, profilePicture } = useSelector((state) => state.auth);
  const { characters, isLoading, isError, message } = useSelector(
    (state) => state.character
  );
  const { posts } = useSelector((state) => state.post);
  const defaultPFP =
    "https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg";

  useEffect(() => {
    document.getElementById("app-body").style.backgroundImage =
      "url('https://wow.zamimg.com/images/tools/dragonflight-talent-calc/blizzard/talentbg-demon-hunter-havoc.jpg')";
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
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <img
          src={profilePicture || defaultPFP}
          alt="Default PFP"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h1> Welcome {user && user.name}</h1>
      </section>

      <CharacterForm />

      <Container className="d-flex justify-content-center">
        <Col style={{ backgroundColor: "rgba(13, 13, 13, 0.6)" }} md={10}>
          <Row>
            <Col md={6}>
              {characters.length > 0 ? (
                <h3>Your characters</h3>
              ) : (
                <h3>You have not added any characters</h3>
              )}
              <section>
                {characters.length > 0 &&
                  characters.map((character) => (
                    <CharacterItem character={character} />
                  ))}
              </section>
            </Col>
            <Col md={6}>
              <section>
                <h3>Your Posts</h3>
                {posts.length > 0 && (
                  <div>
                    {posts.map(
                      (post) =>
                        post.user === user?._id && (
                          <PostItem key={post._id} post={post} />
                        )
                    )}
                  </div>
                )}
              </section>
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Dashboard;
