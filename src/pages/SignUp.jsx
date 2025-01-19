import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMemo, useState } from "react";
import { auth, db } from "../features/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../component/Button";
import GoogleSignup from "../component/GoogleSignup";
import Input from "../component/Input";
import SignUpImg from "../assets/images/signup-1.jpeg";

function Register() {
  const navigate = useNavigate();

  const count = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // console.log("COUNT >>>",count)

  const [useData, setUserdata] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(useData);
    try {
      createUserWithEmailAndPassword(auth, useData.email, useData.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log("User signed up:", user);
          const userType= useData.userType;
          await setDoc(doc(db, 'users', user.uid), { userType:useData.userType, email: useData.email, fName: useData.fName, lName: useData.lName, lastLogin: new Date(), photo:"" });
          await setDoc(doc(db, userType, user.uid), {
            ...useData,
            lastLogin: new Date(),
            photo: "",
          });
        })
        .then(() => {
          console.log("User data saved to Firestore");
          dispatch(login(useData));
          navigate("/dashboard");
          // Redirect or take any action after successful sign-up
        })
        .catch((error) => {
          console.error("Error signing up or saving data:", error.message);
        });
   
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setUserdata({
      ...useData,
      [e.target.name]: e.target.value,
    });
  };

  const usertype = useMemo(() => {
    return [
      {
        userType: "chef",
        tagLine: "Connect with Clients Looking for Your Expertise",
      },
      { userType: "customer", tagLine: "Find the best chefs for your events" },
    ];
  }, []);

  const signupFields = useMemo(() => {
    return [
      {
        label: "First name",
        type: "text",

        placeholder: "First name",
        name: "fName",
      },
      {
        label: "Last name",
        type: "text",
        placeholder: "Last name",
        name: "lName",
      },
      {
        label: "Email address",
        type: "email",
        placeholder: "Enter email",
        name: "email",
      },
      {
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        name: "password",
      },
    ]; 
  }, []);

  // console.log(usertype);
  return (
    <div className="signup-section">
      <div className="signup-img">
        {/* <img src={SignUpImg} alt="IMAGE" /> */}
        <div className="signupImgSection">
         
          <div>
            <h3>
            Join ChefSter
            </h3>
            <p>
            Whether you're here to hire a chef or become one, we’ve got you covered
            </p>
          </div>
        </div>
      </div>
      <div className="signup-content">
      <div className="backBtnSignup">
            <Link to="/">
            &#x21fd;
            </Link>
          </div>
        <form className="signUpForm" onSubmit={handleRegister}>
          <div>
            <h3>Join ChefSter</h3>
            <p>
              Whether you're here to hire a chef or become one, we've got you
              covered
            </p>
          </div>
          <div className="signup-fields">
            
          </div>
          {!Object.keys(useData).length?<div className="profileOption">
                {usertype.map((el) => (
            <div key={el.userType} className="signup-options-section">
              <div className="userTypeSelection">
                <span>ICON</span>
                  <Input
                    inputAttributes={{
                      onChange: handleInput,
                      type: "radio",
                      id: el.userType,
                      name: "userType",
                      value: el.userType,
                    }}
                  />
              </div>
              <div className="userTypeTagline">
                <h5>{el.userType.charAt(0).toUpperCase()+ el.userType.slice(1)}</h5>
                <p>{el.tagLine}</p>
                </div>
            </div>
                ))}
          </div>
                    :
          <div className="signup-fields d-grid-g-1">
          <div className="d-grid-g-1 mb-3">
            {
              signupFields.map((el) => (
                <Input
                className="signupInput"
                  key={el.name}
                  label={el.label}
                  inputAttributes={{
                    value: useData[el.name],
                    type: el.type,
                    placeholder: el.placeholder,
                    name: el.name,
                    onChange: handleInput,
                  }}
                />
              ))
            }
          </div>

          <div className="signupBtn">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
          Already have an account? <Link to="/login">Login</Link>
          </p>
          </div>}
          
        </form>
       
      </div>
    </div>
  );
}
export default Register;
