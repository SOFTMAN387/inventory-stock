import React from "react";
import { Menu, MenuItem, MenuButton } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { actions } from "../../redux/reducers/inventoryReducer";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
const HeaderNav = () => {
  const authUser= useSelector((state) => state?.currentUser[0]?.user) || [];
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleLogout=()=>{
    try {
      dispatch(actions.logoutUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>

      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div className="header-avatar">
              <img alt="avatar" src={authUser?.profilePicture}></img>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderNav;
