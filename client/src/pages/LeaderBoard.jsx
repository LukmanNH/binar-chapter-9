import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { child, ref, getDatabase, get } from "firebase/database";

function LeaderBoard() {
  const [leaderBoardUser, setLeaderBoardUser] = useState([]);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setLeaderBoardUser(Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  leaderBoardUser.sort((a, b) =>
    a.point > b.point ? -1 : b.point > a.point ? 1 : 0
  );

  return (
    <>
      <NavBar />
      <table className="w-[70%] mx-auto mt-24 text-center">
        <thead className="border-b bg-gray-800">
          <tr>
            <th className="text-sm font-medium text-white px-6 py-4">No.</th>
            <th className="text-sm font-medium text-white px-6 py-4">Name</th>
            <th className="text-sm font-medium text-white px-6 py-4">Email</th>
            <th className="text-sm font-medium text-white px-6 py-4">Point</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoardUser.map((key, index) => (
            <tr key={key.email} className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {key.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {key.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {key.point}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LeaderBoard;
