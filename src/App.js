import {useState} from "react";
import Container from "react-bootstrap/Container";
import UserForm from "./pages/UserForm";
import UserList from "./pages/UserList";
import SummaryForm from "./pages/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
import {OrderDetailsProvider, useOrderDetails} from "./contexts/OrderDetails";

import style from './App.module.css'
function App() {
  const [users, setUsers] = useState([
      {name: 'Inna', email: 'inna@inna.com'}
  ])

  const onUserAdd = (user) => {
    setUsers([...users, user])
  }

  return (
      <Container>
          <SummaryForm />
          <OrderDetailsProvider>
              <OrderEntry />
          </OrderDetailsProvider>

        <div className={style.app}>
            <h2>learn react</h2>
            <UserForm onUserAdd={onUserAdd} />
            <hr/>
            <UserList users={users} />
        </div>
      </Container>
  );
}

export default App;
