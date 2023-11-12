import { useState, useEffect } from "react";
import { BiLogIn } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  FloatingLabel,
} from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

    
  useEffect(() => {
    document.getElementById('app-body').style.backgroundImage = "url('https://wow.zamimg.com/images/tools/dragonflight-talent-calc/blizzard/talentbg-mage-fire.jpg')"
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <section className="heading text-center">
                <h1>
                  <BiLogIn /> Login to M+ Recruiter
                </h1>
              </section>
              <section>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="email" label="Email address">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={onChange}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel controlId="password" label="Password">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={onChange}
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group>
                    <Button type="submit" variant="secondary">
                      Log in
                    </Button>
                  </Form.Group>
                </Form>
              </section>
            </Col>
          </Row>
        </Container>
     
    </>

    // <>
    //   <section className = 'heading'>
    //     <h1>
    //       <FaSignInAlt /> Login
    //     </h1>
    //     <p>Please log in </p>
    //   </section>
    //   <section className="form">
    //     <form onSubmit={onSubmit}>
    //       <div className="form-group">
    //         <input
    //           type="email"
    //           className="form-control"
    //           id="email"
    //           name="email"
    //           value={email}
    //           placeholder="Enter your email"
    //           onChange={onChange}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <input
    //           type="password"
    //           className="form-control"
    //           id="password"
    //           name="password"
    //           value={password}
    //           placeholder="Enter your password"
    //           onChange={onChange}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <button type="submit" className="btn btn-block">
    //           Submit
    //         </button>
    //       </div>
    //     </form>
    //   </section>
    // </>
  );
}

export default Login;
