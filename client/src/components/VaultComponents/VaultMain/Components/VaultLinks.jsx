import { NavLink } from "react-router-dom";

const VaultLinks = () => {
  return (
    <>
      <div>
        <div className="ui__menu">
          <div className="ui__menu--header">
            <p>Menu</p>
            <hr style={{ width: "15rem" }} />
          </div>
          <ul className="ui">
            <NavLink to="#">My Vault</NavLink>
            <NavLink to="/vault/new">+Organization</NavLink>
            <div className="ui__menu--header">
              <hr style={{ width: "15rem" }} />
            </div>
            <NavLink to="/vault/all-items">All-Items</NavLink>
            <NavLink to="/vault/fav">Favourites</NavLink>
            <NavLink to="/vault/trash">Trash</NavLink>
            {/* Types */}
            <NavLink to="/vault/login">Login</NavLink>
            <NavLink to="/vault/card">Card</NavLink>
            <NavLink to="/vault/identity">Identity</NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default VaultLinks;
