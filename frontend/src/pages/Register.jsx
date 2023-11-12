import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsJournalArrowUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.getElementById("app-body").style.backgroundImage =
      "url('https://wow.zamimg.com/images/tools/dragonflight-talent-calc/blizzard/talentbg-rogue-outlaw.jpg')";
  }, []);
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
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col  md={6}>
            <section className="heading text-center">
              <h1>
                <BsJournalArrowUp /> Register
              </h1>
              <p>Please create an account</p>
            </section>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
          <section>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="name" label="Enter username">
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your username"
                    onChange={onChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="email" label="Enter your email">
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="password" label="Enter your password">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="password2"
                  label="Confirm your password"
                >
                  <Form.Control
                    type="password"
                    id="password2"
                    name="password2"
                    value={password2}
                    placeholder="Confirm your password"
                    onChange={onChange}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <Button type="submit" variant="secondary" block>
                  Register
                </Button>
              </Form.Group>
            </Form>
            </section>
          </Col>
        </Row>
      </Container>
    </>
    // <>
    //   <section className="heading">
    //     <h1>
    //       <BsJournalArrowUp /> Register
    //     </h1>
    //     <p>Please create an account</p>
    //   </section>
    //   <section className="form">
    //     <form onSubmit={onSubmit}>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="name"
    //           name="name"
    //           value={name}
    //           placeholder="Enter your username"
    //           onChange={onChange}
    //         />
    //       </div>
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
    //         <input
    //           type="password"
    //           className="form-control"
    //           id="password2"
    //           name="password2"
    //           value={password2}
    //           placeholder="Confirm your password"
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

export default Register;
