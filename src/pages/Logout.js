/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const Logout = () => {
  const { logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(async () => {
    await logout();
    navigate("/");
  }, []);

  return <p>You are logging</p>;
};

export default Logout;
