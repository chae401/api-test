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
    event.preventDefault();
    const authData = {
      message: teamName,
      authHash: generateAuthHash(),
    };
    const saveData = {
      teamName: teamName,
    };
    auth(authData)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1000) {
          console.log("Bearer", res.data.data);
          save(saveData, res.data.data)
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log("Error : ", e);
            });
        }
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          팀명:
          <input type="text" value={teamName} onChange={handleInputChange} />
        </label>
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default App;
