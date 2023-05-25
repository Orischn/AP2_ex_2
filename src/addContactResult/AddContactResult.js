import { useEffect, useState } from "react";
import Contact from "../contact/Contact";
import SearchContact from "../searchContact/SearchContact";

function AddContactResult({ contacts, selectedContact, setSelectedContact, token, latestContact }) {
    const [filter, setFilter] = useState('');
    // const [contactsList, setContactsList] = useState(contacts.map((contact, key) => {
    //     return <Contact {...contact} key={key} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
    // }))

    const [contactsList, setContactsList] = useState([]);
    useEffect(() => {
        getContactsList();
    }, [latestContact, filter, selectedContact]);

    const getContactsList = async () => {
        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'get',
            'headers': {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.status === 200) {
            res.text().then((contacts) => {
                setContactsList(JSON.parse(contacts).map((contact, key) => {
                    return <Contact chat={contact} key={key} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
                }));
            });
        }

        // useEffect(() => {
        //     setContactsList(contacts.filter((contact) => {
        //         if (filter !== '') {
        //             return contact.dName.toLowerCase().includes(filter.toLowerCase());
        //         }
        //         return true
        //     }).map((contact, key) => {
        //         return <Contact {...contact} key={key} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        //     }));
        // }, [filter, contacts, selectedContact])

        
    }
    // getContactsList();
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