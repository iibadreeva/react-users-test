import {useState} from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import style from './App.module.css'
function App() {
  const [users, setUsers] = useState([
      {name: 'Inna', email: 'inna@inna.com'}
  ])

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
      <div className={style.app}>
        <h2>learn react</h2>
        <UserForm onUserAdd={onUserAdd} />
        <hr/>
        <UserList users={users} />
      </div>
  );
}

export default App;
