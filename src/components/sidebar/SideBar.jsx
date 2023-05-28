import "./sidebar.scss";
import PermIdentity from "@mui/icons-material/PermIdentity";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TerminalIcon from "@mui/icons-material/Terminal";
import { NavLink } from "react-router-dom";

export default function SideNavigation({ permissions, location, active }) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link">
              <li className="sidebarListItem">
                <HomeIcon className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            <NavLink to={`/profile/${location}`} className="link">
              <li
                className={`sidebarListItem ${active == "profile" && "active"}`}
              >
                <PermIdentity className="sidebarIcon" />
                Profile
              </li>
            </NavLink>
            {permissions?.settings && (
              <NavLink to={`/settings`} className="link">
                <li
                  className={`sidebarListItem ${
                    active == "settings" && "active"
                  }`}
                >
                  <SettingsIcon className="sidebarIcon" />
                  Settings
                </li>
              </NavLink>
            )}
            <NavLink to={`/faq/${location}`} className="link">
              <li className={`sidebarListItem ${active == "faq" && "active"}`}>
                <QuestionAnswerIcon className="sidebarIcon" />
                F&Q
              </li>
            </NavLink>
            {permissions?.fordevs && (
              <NavLink className="link">
                <li className="sidebarListItem">
                  <TerminalIcon className="sidebarIcon" />
                  for developers
                </li>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
