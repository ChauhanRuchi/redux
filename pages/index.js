import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { increment, decrement } from "../redux/counterSlice";
import { addUser, deleteUser, updateUser } from "../redux/userCrudSlice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter);
  const users = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ username, id: Math.random() }));
    setUsername("");
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setEditName(user.username);
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: editId, username: editName }));
    setEditId(null);
    setEditName("");
  };
  console.log("userr", users)
  return (
    <>
      <button onClick={() => dispatch(increment())}>Increment</button>
      {value?.value}
      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editId === user.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editId === user.id ? (
                  <button onClick={handleUpdate}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}