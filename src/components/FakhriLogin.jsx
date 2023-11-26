import { useDispatch } from "react-redux";
import { login } from "../features/user";
import { useState, useEffect } from "react";

export default function FakhriLogin({ itsId }) {

  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ itsId: itsId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [itsId]);

  if(data){
    dispatch(
      login({
        auth: true,
      })
    );
    return;
  }
    
}
