import Clock from "../clock/Clock";

function MyMessage({content}) {
    return (
        <div dir="rtl">
            <div className="myMessage">
                {content}
                <br />
                <span id="textTime" className="badge text-opacity-50"><Clock messages={[]}/></span>
            </div>
        </div>
    );
}

export default MyMessage;