import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ImGooglePlus3 } from "react-icons/im";

import style from './style.module.scss'

const SingInButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className={style.container} onClick={() => signOut()}>
        <ImGooglePlus3 /> {session.user?.email}
      </button>
    );
  }
  return (
    <button className={style.container} onClick={() => signIn("google")}>
      <ImGooglePlus3 /> Sign in
    </button>
  );
};

export default SingInButton;
