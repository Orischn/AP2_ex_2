import { useRef, useState } from "react";

function AddContact({ addContact, registered, me }) {
    const addBar = useRef(null);
    const [addedContacts, setAddedContacts] = useState([]);

    const add = function (e) {
        e.preventDefault(); // Prevent the default form submission
        const contactIdentifier = addBar.current.value.trim();

        if (contactIdentifier !== "") {
            var existingContact = registered.find(
                (register) => {
                    return register.username.toLowerCase() === contactIdentifier.toLowerCase();
                }
            );
            if (existingContact) {
                if (existingContact.username !== me.username) {
                    existingContact = {...existingContact, messages: []};
                    const isContactAlreadyAdded = addedContacts.some(
                        (contact) => contact.username === existingContact.username
                    );
                    if (!isContactAlreadyAdded) {
                        addContact(existingContact);
                        setAddedContacts((prevContacts) => [...prevContacts, existingContact]);
                    } else {
                        // Show an error message: Contact already added
                    }
                } else {
                    // Show an error message: You cant add yourself.
                }
            } else {
                // Show an error message: No such person in registered array
            }

            addBar.current.value = ""; // Clear the input field after adding the contact
        }
    };

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
                                <button type="button" onClick={() => { addBar.current.value = '' }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Contact</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    );
}

export default AddContact;
