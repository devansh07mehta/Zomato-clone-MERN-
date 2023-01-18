import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { googleAuth } from "../redux/reducers/auth/auth.action";

const GoogleAuth = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(googleAuth(token)).then(() => navigate("/delivery"));
    }
  }, [token]);

  return <div>Loading, Please Wait...</div>;
};

export default GoogleAuth;
