import React, { useEffect, useState } from "react"
import axios from "axios"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getData() {
      const data = await axios.get("/api/users")
      setUsers(data.data)
    }
    getData()
  }, [])

  return (
    <div>
      <h2>Acá van los usuarios</h2>
      {users.map((item) => (
        <li key={item._id}>{item.name}</li>
      ))}
    </div>
  )
}

export default Users
