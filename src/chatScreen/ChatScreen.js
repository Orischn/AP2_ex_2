import { useNavigate } from "react-router-dom";
import ChatBlock from "../chatBlock/chatBlock";
import noContactChosenPic from "./noContactChosenPic.jpg";

function ChatScreen({ selectedContact, send, setToken }) {
  const navigate = useNavigate();
  const logout = () => {
    setToken('');
    navigate('/loginPage');
  }

  return (
    <div id="chatBlock" className="col-8">
      {selectedContact ? (
        <ChatBlock contact={selectedContact} send={send} logout={logout} />
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