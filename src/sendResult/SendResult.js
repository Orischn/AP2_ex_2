import { useEffect, useState } from "react";
import MyMessage from "../myMessage/MyMessage";
import OtherMessage from "../otherMessage/OtherMessage";


function SendResult({ token, me, latestMessage, contact }) {

  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
      getMessages();
  }, [latestMessage, contact]);

  const getMessages = async function () {
    const res = await fetch(`http://localhost:5000/api/Chats/${contact.id}/Messages`, {
      'method': 'get',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (res.status === 200) {
      res.text().then((messages) => {
        setMessageList(JSON.parse(messages).reverse().map((message, key) => {
          if (me.username === message.sender.username) {
            return <MyMessage message={message} key={key} />;
          }
          else {
            return <OtherMessage message={message} key={key} />
          }
        }));
      });
    }
  }

  return (
    <ul className="list-group">
      {messageList}
    </ul> //Maybe without ul
  );
}

export default SendResult;