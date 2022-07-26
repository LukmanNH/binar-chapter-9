import { React, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onValue, ref, set, getDatabase, get, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import ButtonPrimary from "../components/ButtonPrimary";
import NavBar from "../components/NavBar";

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [point, setPoint] = useState(null);
  const navigate = useNavigate();
  const dbRef = ref(getDatabase());

  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
          setEmail(user.email);

          get(child(dbRef, `users/${userId}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                setName(snapshot.val().name);
                setPhone(snapshot.val().phone);
                setPoint(snapshot.val().point);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          navigate("/login");
        }
      });
    },
    [userId],
    [email],
    [name],
    [phone],
    [point]
  );

  return (
    <>
      <NavBar />
      <div className="container-full bg-[#252525] w-full lg:h-[39.75rem] flex justify-between">
        <div className="pt-[6.25rem] pl-[9.375rem]">
          <div className="absolute bottom-64 left-0">
            <img src="dot-illustration.svg" alt="dot" />
          </div>
          <div className="flex">
            <img src="icon_hero.svg" alt="category icon" className="mr-3" />
          </div>
          <h4 className="font-bold text-5xl max-w-lg text-white mt-3 leading-[56px] mb-12">
            Profile
          </h4>
          <p className="text-white text-[1.125rem] font-light">Email</p>
          <p className="text-white text-[1.125rem] font-bold">{email}</p>
          <p className="text-white text-[1.125rem] font-light">Name</p>
          <p className="text-white text-[1.125rem] font-bold">{name}</p>
          <p className="text-white text-[1.125rem] font-light">Phone</p>
          <p className="text-white text-[1.125rem] font-bold">{phone}</p>
          <p className="text-white text-[1.125rem] font-light">Point</p>
          <p className="text-white text-[1.125rem] font-bold">{point} pt</p>
        </div>
        <div>
          <img
            src="hero.png"
            alt="hero"
            className="w-[40.5rem] h-[37.406rem]"
          />
        </div>
      </div>
      <div className="container-full bg-[#161616] w-full lg:[45.625rem] flex relative justify-between px-[9.375rem]"></div>
    </>
  );
}
