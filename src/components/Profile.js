import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "loading...",
    email: "loading...",
    date: "loading...",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      props.showAlert("You are not logged in", "danger");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser({
      name: json.name,
      email: json.email,
      date: json.date.split("T")[0],
    });
    //  console.log(user.date)
  };
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src="https://via.placeholder.com/150"
                className="card-img"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title text-center">{user.name}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Email:</strong> {user.email}
                  </li>
                  <li className="list-group-item">
                    <strong>User since:</strong> {user.date}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
