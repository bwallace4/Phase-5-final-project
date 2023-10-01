import React, { useState,useEffect } from 'react'

export function Products() {
  const [content, setContent] = useState( <ProductList showForm={showForm} />);

  function showList(){
    setContent(<ProductList showForm={showForm} />);
  }

  function showForm(){
    setContent(<ProductForm showList={showList} />)
  }
  return (
    <div className='container my-5'>
      {content}
    </div>
  )
}

function ProductList(props) {
  const [users, setUsers] = useState([]);

  function USER() {
    useEffect(() => {
      fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then((users) => setUsers(users));

      
    },[]);
  

  }
  return (
    <>
    <h2 className="text-center mb-3"> List of products</h2>
    <button onClick={() => props.showForm()}type='button' className='btn btn-primary me-2'>Create</button>
   <table className='table'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index)=> {
          return(
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>

            </tr>
          )
        })
      }
    </tbody>
   </table>
    </>
  )
}

function ProductForm(props) {
  return (
    <>
    <h2 className="text-center mb-3"> Create New Product</h2>
    <button onClick={() => props.showList()} type='button' className='btn btn-primary me-2'>Cancel</button>
    </>
  )
}