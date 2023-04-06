import {useState} from "react";
import UserForm from "./pages/UserForm";
import UserList from "./pages/UserList";
import SummaryForm from "./pages/SummaryForm";
import style from './App.module.css'
function App() {
  const [users, setUsers] = useState([
      {name: 'Inna', email: 'inna@inna.com'}
  ])

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
      <div>
          <SummaryForm />
        <div className={style.app}>
            <h2>learn react</h2>
            <UserForm onUserAdd={onUserAdd} />
            <hr/>
            <UserList users={users} />
        </div>
      </div>
  );
}

export default App;
