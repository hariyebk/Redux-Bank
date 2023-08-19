import CreateCustomer from "./features/cutomers/CreateCustomer";
import Customer from "./features/cutomers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import {useSelector} from "react-redux"
import {useState} from "react"

function App() {
  const name = useSelector(store => store.customer.fullName)
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!name ? <CreateCustomer /> :
      <>
        <Customer />
        <AccountOperations/>
        <BalanceDisplay/>
      </>
      }
    </div>
  );
}

export default App;
