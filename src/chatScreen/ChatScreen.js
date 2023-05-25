import { useNavigate } from "react-router-dom";
import ChatBlock from "../chatBlock/chatBlock";
import noContactChosenPic from "./noContactChosenPic.jpg";

function ChatScreen({ selectedContact, setToken, me, token, latestMessage, setLatestMessage }) {
  const navigate = useNavigate();
  const logout = () => {
    setToken('');
    navigate('/loginPage');
  }

  return (
    <div id="chatBlock" className="col-8">
      {selectedContact ? (
        <ChatBlock token={token} me={me} contact={selectedContact} logout={logout}
        latestMessage={latestMessage} setLatestMessage={setLatestMessage} />
      ) : (
        <div style={{ position: "relative" }}>
          <button style={{ position: "absolute", top: 8, right: 5 }} className="btn btn-danger" onClick={logout}>logout</button>
          <img src={noContactChosenPic} style={{ height: "100%", width: "100%" }} />
        </div>
      )}
    </div>
  );

}

export default ChatScreen;