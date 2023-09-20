import { useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Layout = (props) => {
  let contentRef,
    sideNavRef = useRef();

  const menuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;

    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
    }
  };

  return (
    <>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            <a className="icon-nav m-0 h5" onClick={menuBarClickHandler}>
              <AiOutlineMenuUnfold />
            </a>
            <Link to="/">
              <img className="nav-logo mx-2" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex">
            <div className="user-dropdown">
              <img className="icon-nav-img icon-nav" src={["photo"]} alt="" />
              <div className="user-dropdown-content ">
                <div className="mt-4 text-center">
                  <img className="icon-nav-img" src={["photo"]} alt="" />
                  <h6>{["firstName"]}</h6>
                  <hr className="user-dropdown-divider  p-0" />
                </div>
                <NavLink to="/Profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a className="side-bar-item">
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open">
        <NavLink
          className={(navData) =>
            navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
          }
          to="/">
          <RiDashboardLine className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Dashboard</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
          }
          to="/create-task">
          <AiOutlineEdit className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Create New</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
          }
          to="/new-task">
          <BsListNested className="side-bar-item-icon" />
          <span className="side-bar-item-caption">New Task</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
          }
          to="/progress-task">
          <BsHourglass className="side-bar-item-icon" />
          <span className="side-bar-item-caption">In Progress</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
          }
          to="/completed-task">
          <AiOutlineCheckCircle className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Completed</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"
          }
          to="/canceled-task">
          <MdOutlineCancelPresentation className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Canceled</span>
        </NavLink>
      </div>

      <div ref={(div) => (contentRef = div)} className="content">
        {props.children}
      </div>
    </>
  );
};

export default Layout;
