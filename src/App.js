import { useState } from "react";
import { auth, save } from "./api";
import cryptoJs from "crypto-js";

function App() {
  const [teamName, setTeamName] = useState("");

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const generateAuthHash = () => {
    const message = teamName;
    console.log("message : ", message);
    const secretKey = "NHVzLwHNeIXuNIiXerePIGVj5kzJmJYA";
    const hmac = cryptoJs.HmacSHA256(message, secretKey);
    const authHash = cryptoJs.enc.Base64.stringify(hmac);
    return authHash;
  };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    try{
      const saveData = {
        teamName: teamName,
      };
      const authRes = await auth({teamName: teamName});
      console.log("authRes : ", authRes);
      const d = await save(saveData, authRes.data.data)
    } catch(e){
      console.log(e);
    }
  
  };

  return (
    <div>
      <label>
          팀명:
          <input type="text" value={teamName} onChange={handleInputChange} />
        </label>
        <button onClick={handleSubmit}>전송</button>
    </div>
  );
}

export default App;
