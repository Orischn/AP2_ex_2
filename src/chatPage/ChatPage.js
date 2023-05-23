import { useEffect, useState } from 'react';
import AddContact from '../addContact/AddContact';
import AddContactResult from '../addContactResult/AddContactResult';
import ChatScreen from '../chatScreen/ChatScreen';

function ChatPage({ token }) {
  const [registered, setRegistered] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  useEffect(() => {
    setRegistered(users.map((user, key) => {
      return {username : user.username, dName: user.displayName, profilePic: user.profilePic};
    }))
  }, users);


  const add = function (contact) {
    setContactsList([...contactsList, { ...contact }]);
  }
 

  const send = function (message) {
    if (selectedContact) {
      const updatedMessages = [...(selectedContact.messages || []), message];
      const updatedContacts = contactsList.map((contact) => {
        if (contact.username === selectedContact.username) {
          setSelectedContact({...contact, messages: updatedMessages})
          return { ...selectedContact, messages: updatedMessages };
        }
        return contact;
      });
      setContactsList(updatedContacts);
    }
  };

  return (
    <div id="window" className="container">
      <div className="row">
        <div id="contactBlock" className="col-4">
          <div id="me" className="d-flex align-items-center w-100">
            <img className="ms-3 rounded-circle" src={me.profilePic} />
            <b className="ms-2 w-100 text-white-50">{me.displayName}</b>
            <AddContact addContact={add} registered={registered} me={me} />
          </div>
          <div className="d-flex align-items-center">
          </div>
          <div>
            <AddContactResult contacts={contactsList} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
          </div>
        </div>
        <ChatScreen selectedContact={selectedContact} send={send} setLoggedIn={setLoggedIn} />
      </div>
    </div>
  );
}

export default ChatPage;
