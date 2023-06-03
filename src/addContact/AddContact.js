import { useRef, useState } from "react";

function AddContact({ token, setLatestContact }) {

    const addBar = useRef(null);
    const [error, setError] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);

    const add = async function (e) {
        e.preventDefault(); // Prevent the default form submission
        setError('');
        const contactIdentifier = addBar.current.value.trim();
        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            'body': JSON.stringify({
                "username": contactIdentifier,
            })

        })

        if (res.status !== 201) { //error
            await res.text().then((errorMessage) => {
                setError(errorMessage);
            })
            setIsSuccessful(false);
            return;
        }
        
        else {
            await res.text().then((contact) => {
                setLatestContact(contact);
            });
            setError("Added Successfully");
            setIsSuccessful(true);
            
            addBar.current.value = ""; // Clear the input field after adding the contact
            
        }
        
    }
    return (
        <>
            {/* Button trigger modal */}
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i id="addContact" className="bi bi-person-fill-add" />
            </button>
            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">ADD CONTACT</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={add}>
                            <div className="modal-body">
                                <input type="text" ref={addBar} className="form-control" placeholder="Contact's identifier" />
                            </div>
                            <div className="modal-footer">
                                {error &&
                                    <span className={`alert ${isSuccessful? "alert-success": "alert-danger"} w-50`} role="alert">
                                        {error}
                                    </span>}
                                <button type="button" onClick={() => { addBar.current.value = ''; setError(''); }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    );
}

export default AddContact;
