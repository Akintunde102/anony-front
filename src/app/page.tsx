'use client'
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const getUsers = async () => {
    const response = await axios.get("http://localhost:9000/users");
    return response.data
  }

  const addUser = async (e: any) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:9000/users", {
      firstName,
      lastName,
    });

    return response;
  }

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    })
  }, [])




  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div style={{
          flex: 1

        }}>
          <form
            style={{
              margin: "0 20px",
            }}
            onSubmit={addUser}
          >
            <input
              style={{ display: "block", padding: "10px", margin: "3px 0", width: "100%" }}
              type="text"
              value={firstName}
              placeholder="First Name"
              name="firstName"
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />

            <input
              style={{ display: "block", padding: "10px", margin: "3px 0", width: "100%" }}
              type="text"
              value={lastName}
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />

            <button
              style={{ display: "block", padding: "10px", margin: "3px 0", width: "100%" }}
              type="submit">
              Add a fixed User
            </button>
          </form>
        </div>

        <div style={{
          flex: 1

        }}>
          <h1>Users List</h1>
          <div>
            {
              users.map((user: any) => {
                return (
                  <div style={{
                    margin: "10px",
                    color: "blue"
                  }}>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p>{user._id}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>
    </main >
  );
}
