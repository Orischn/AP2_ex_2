import { useEffect, useState } from 'react';
import AddContact from '../addContact/AddContact';
import AddContactResult from '../addContactResult/AddContactResult';
import ChatScreen from '../chatScreen/ChatScreen';

function ChatPage({ token, setToken, myUsername }) {
  const [registered, setRegistered] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [me, setMe] = useState({});
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    const res = await fetch(`http://localhost:5000/api/Users/${myUsername}`, {
      'method': 'get',
      'headers': {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      res.text().then((user) => {
        setMe(JSON.parse(user));
      });
    }
  }
  
  const add = function (contact) {
    setContactsList([...contactsList, { ...contact }]);
  }

  const send = function (message) {
    if (selectedContact) {
      const updatedMessages = [...(selectedContact.messages || []), message];
      const updatedContacts = contactsList.map((contact) => {
        if (contact.username === selectedContact.username) {
          setSelectedContact({ ...contact, messages: updatedMessages })
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
          <div id="me" className="d-flex align-items-center w-100" >
            <script>{console.log(me)},
            {console.log(me.profilePic)},
            {console.log(me.displayName)}</script>
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
        <ChatScreen selectedContact={selectedContact} send={send} setToken={setToken} />
      </div>
    </div>
  );
}

export default ChatPage;
