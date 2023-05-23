import { useEffect, useRef } from 'react';

function InfoInput({ title, placeholder, value, setValue, error }) {
    var input = useRef('');
    useEffect(() => {
        if (title === 'Password' || title === 'Verify password') {
            if (input.current !== '') {
                input.current.type = 'password';
            }
        }
        if (title === 'Picture') {
            if (input.current !== '') {
                input.current.type = 'file';
            }
        }
    }, [title])

    function handleChange(e) {
        if (input.current.type==='file') {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setValue(imageUrl);
            return;
        }
        setValue(e.target.value)
    }
    return (
        <>
            <div className="row row-cols-2 justify-content-md-center">
                <div className="col-2 text-white">
                    {title}
                </div>
                <div className="col-4">
                    <input ref={input} type="text" className="form-control inputText" placeholder={placeholder} id={title} onChange={(e) => handleChange(e)} required />
                </div>
                <div className='col-4 mt-1'>
                    {error &&
                        <span className="alert alert-danger w-50" role="alert">
                            {error}
                        </span>}
                </div>
            </div>
            <br />
        </>
    );
}

export default InfoInput;