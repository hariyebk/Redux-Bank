import {useSelector } from "react-redux/es/hooks/useSelector";
function Customer() {
  // subscribing to the react-redux store provider
  const name = useSelector(store => store.customer.fullName)

  return <h2>👋 Welcome, {name}</h2>;
}

export default Customer;
