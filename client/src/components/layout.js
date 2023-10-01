import React from "react";

export function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white border-bottom box-shallow py-3 mb-3'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          Web app
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='/home'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/products'>
                Products
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

