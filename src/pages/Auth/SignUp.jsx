import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
 
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
     e.preventDefault();

     let profileImageUrl = "";
     if(!fullName){
      setError("Please enter your name");
      return;
     };
     if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
     };
     if(!password){
      setError("Please enter a valid and strong password");
      return;
     };
     setError("");

     //signup api call
     try{
      //upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });
      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
     }catch(error){
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      }
     }
  };

  //Handle token from Google Login
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
    
      if (token) {
        localStorage.setItem("token", token);
        
        axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log("OAuth user fetched:", res.data);
          updateUser(res.data);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          navigate("/login", { replace: true });
        });
      }
    }, [navigate, updateUser]);

 const loginWithGoogle = () => {
      window.open("http://localhost:8000/api/v1/auth/google/callback", "_self");
    };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <h3 className='text-[40px] font-semibold text-black'>Create an account</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>Track your spending, save smarter, and take control of your finances.</p>

          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                    value={fullName}
                    onChange={({target}) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="Your name"
                    type="text"
                 />
                 <Input
                    value={email}
                    onChange={({target}) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="yourname@example.com"
                    type="text"
                 />

                 <div className='col-span-2'>
                 <Input
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    label="Password"
                    placeholder="Min 8 characters"
                    type="password"
                  />
                  </div>
              </div>
              {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
             <button type='submit' className='btn-primary'>Singup</button>
             <p className='text-[13px] text-slate-800 mt-3'>
                Already have an account?{" "}
                <Link className='font-medium text-yellow-500 underline' to="/login">Login</Link>
             </p>
          </form>

       <button className='google-btn' onClick={loginWithGoogle}>Sign in with Google</button>
      </div>
    </AuthLayout>
  )
}

export default SignUp
