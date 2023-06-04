import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import InfoInput from "../infoInput/InfoInput";

function RegisterPage({ users, setUsers }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [img, setImg] = useState('');
    const [isRobot, setIsRobot] = useState(false)
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [displayNameError, setDisplayNameError] = useState('');
    const [imgError, setImgError] = useState('');
    const [isRobotError, setIsRobotError] = useState('');
    const navigate = useNavigate();
    const neededInfo = [
        { title: "userName",
        placeholder : 'Enter your username here',
        value : username,
        setValue : setUsername,
        error : usernameError},

        { title: "Password",
        placeholder : 'Enter your password here',
        value : password,
        setValue : setPassword,
        error : passwordError},

        { title: "Verify password",
        placeholder : 'Enter your password again',
        value : verifyPassword,
        setValue : setVerifyPassword,
        error : verifyPasswordError},

        { title: "Display name",
        placeholder : 'Enter the name you want people to see you by',
        value : displayName,
        setValue : setDisplayName,
        error : displayNameError},

        { title: "Picture",
        placeholder : 'Upload your profile picture here',
        value : img,
        setValue : setImg,
        error : imgError}
    ];
    const infoInputList = neededInfo.map((data, key) => {
        return <InfoInput {...data} key={key} />;
    })

    const handleSubmit = async (e) => {
        setUsernameError('');
        setPasswordError('');
        setVerifyPasswordError('');
        setDisplayNameError('');
        setImgError('');
        setIsRobotError('');
        e.preventDefault();
        if (username.trim() === '') {
            setUsernameError('Username is required!');
            return;
        }

        if (password.trim() === '') {
            setPasswordError('Password is required!');
            return;
        }

        if (verifyPassword.trim() === '') {
            setVerifyPasswordError('Verify password is required!');
            return;
        }

        if (displayName.trim() === '') {
            setDisplayNameError('Display name is required!');
            return;
        }

        if (img === null) {
            setImgError('Image is required!');
            return;
        }

        if (isRobot === false) {
            setIsRobotError('Please check the I am not a robot box');
            return;
        }

        const nameRegex = new RegExp('^[a-zA-Z]+$')
        if (!nameRegex.test(username)) {
            setUsernameError('Username must contain only letters');
            return;
        }

        const passwordRegex = new RegExp('^[a-zA-Z1-9!*]+$')
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must contain only letters digits or !/*');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        }

        const digitCheck = new RegExp('[1-9]');
        if (!digitCheck.test(password)) {
            setPasswordError('Password must contain at least one digit');
            return;
        }

        const upperCheck = new RegExp('[A-Z]');
        if (!upperCheck.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter');
            return;
        }

        const lowerCheck = new RegExp('[a-z]');
        if (!lowerCheck.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter');
            return;
        }

        if (verifyPassword !== password) {
            setVerifyPassword('');
            setVerifyPasswordError('Passwords do not match!');
            return;
        }

        if (!nameRegex.test(displayName)) {
            setDisplayNameError('display name must contain only letters');
            return;
        }
        const res = await fetch('http://localhost:5000/api/Users', {
            'method' : 'post',
            'headers' : {
                'Content-Type' : 'application/json',
            },
            'body' : JSON.stringify({"username" : username,
            "password" : password,
            "displayName" : displayName,
            "profilePic" : img,
            })
        })
        if (res.status !== 200) {
            res.text().then((error) => {
                setUsernameError(error);
            })
            return;
        }
        navigate('/loginPage')
    };

    return (
        <>
            <div className="rounded-pill halation"></div>
            <br /><br /><br />
            <div className="card">
                <form noValidate className="container-fluid" onSubmit={handleSubmit}>
                    {infoInputList}
                    <div className="row justify-content-md-center">
                        <div className="col-2 text-white">I am not a robot</div>
                        <div className="col-1">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="invalidCheck" checked={isRobot} onChange={(e) => setIsRobot(e.target.checked)} required />
                            </div>
                        </div>
                        <div className='col-7 mt-1'>
                            {isRobotError &&
                                <span className="alert alert-danger w-25">{isRobotError}</span>
                            }
                        </div>
                    </div>
                    <div><br /></div>
                    <div className="row justify-content-md-center">
                        <div className="col-6">
                            <input type="submit" className="btn btn-primary submit" value="Register" />
                        </div>
                        <div className="col-6 text-white">
                            Already registered? <Link to="/loginPage" className="card-link">Click here</Link> to login
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;