const Logout = () => {
  const logout = async () => {
    await fetch('/api/logout')
  }

  return <button onClick={() => logout()}>Logout</button>
}

export default Logout
