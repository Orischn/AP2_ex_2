import { useEffect, useState } from 'react';
import AddContact from '../addContact/AddContact';
import AddContactResult from '../addContactResult/AddContactResult';
import ChatScreen from '../chatScreen/ChatScreen';

function ChatPage({ token, setToken, myUsername }) {
  const [registered, setRegistered] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [update, setUpdate] = useState(null);
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

  
  return (
    <div id="window" className="container-fluid">
      <div className="row">
        <div id="contactBlock" className="col-4">
            <div id="me" className="d-flex align-items-center w-100">
              <img className="ms-3 rounded-circle" src={me.profilePic} />
              <b className="ms-2 w-100 text-white-50">{me.displayName}</b>
              <AddContact setLatestContact={setUpdate} addContact={add}
              registered={registered} me={me} token={token} />
            </div>
          <AddContactResult latestContact={update} setLatestContact={setUpdate} token={token}
          contacts={contactsList} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
        </div>
        <ChatScreen latestMessage={update} setLatestMessage={setUpdate}
        token={token} me={me} selectedContact={selectedContact} setToken={setToken} />
      </div>
    </div>
  );
}

export default ChatPage;
