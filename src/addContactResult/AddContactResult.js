import { useEffect, useState } from "react";
import Contact from "../contact/Contact";
import SearchContact from "../searchContact/SearchContact";

function AddContactResult({ contacts, selectedContact, setSelectedContact }) {
    const [filter, setFilter] = useState('');
    const [contactsList, setContactsList] = useState(contacts.map((contact, key) => {
        return <Contact {...contact} key={key} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
    }))
    useEffect(() => {
        setContactsList(contacts.filter((contact) => {
            if (filter !== '') {
                return contact.dName.toLowerCase().includes(filter.toLowerCase());
            }
            return true
        }).map((contact, key) => {
            return <Contact {...contact} key={key} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        }));
    }, [filter, contacts, selectedContact])

    return (
        <>
            <SearchContact filter={filter} setFilter={setFilter} />
            <ul className="list-group">
                {contactsList}
            </ul>
        </>
    );
}

export default AddContactResult;