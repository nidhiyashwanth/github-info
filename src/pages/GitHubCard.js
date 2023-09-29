import axios from "axios";
import { useState } from "react";
import { VscRepo } from "react-icons/vsc";
import { MdPublic, MdDateRange } from "react-icons/md";

const GithubCard = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("User not found");
      } else {
        setError("An error occurred");
      }
      setUserData(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
          className="border-2 text-black p-2 rounded-l-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-[10px] rounded-r-full mt-2"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <div className="align-middle border-2 text-black border-gray-300 p-4 rounded-md">
          <img
            src={userData.avatar_url}
            alt="Avatar"
            className="w-16 h-16 rounded-full mb-2"
          />
          <h2 className="text-xl font-bold mb-2">{userData.login}</h2>
          <h3 className="text-lg mb-2">{userData.name}</h3>
          <p className="flex align-middle items-center">
            <VscRepo /> <strong className="mx-1">Public repos:</strong>{" "}
            {userData.public_repos}
          </p>
          <p className="flex items-center">
            <MdPublic /> <strong className="mx-1">Public gists:</strong>{" "}
            {userData.public_gists}
          </p>
          <p className="flex items-center">
            <MdDateRange />{" "}
            <strong className="mx-1">Profile created at:</strong>{" "}
            {new Date(userData.created_at).toISOString().split("T")[0]}
          </p>
        </div>
      )}
    </div>
  );
};

export default GithubCard;
