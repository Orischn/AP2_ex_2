import { useEffect, useState } from "react";
import Contact from "../contact/Contact";
import SearchContact from "../searchContact/SearchContact";

function AddContactResult({ selectedContact, setSelectedContact, token, latestContact, setLatestContact }) {
    const [filter, setFilter] = useState('');
    const [contactsList, setContactsList] = useState([]);
    useEffect(() => {
        getContactsList(filter);
        setLatestContact(null);
    }, [latestContact, filter, selectedContact]);

    const getContactsList = async (filter) => {
        const res = await fetch('http://localhost:5000/api/Chats', {
            'method': 'get',
            'headers': {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (res.status === 200) {
            res.text().then((chats) => {
                setContactsList(JSON.parse(chats).filter((chat) => {
                    if (filter !== '') {
                        return chat.user.displayName.toLowerCase().includes(filter.toLowerCase());
                    }
                    return true
                }).map((contact, key) => {
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
        <div>
            <SearchContact filter={filter} setFilter={setFilter} />
            <div id="chats">
                <ul className="list-group">
                    {contactsList}
                </ul>
            </div>
        </div>
    );

}

export default AddContactResult;