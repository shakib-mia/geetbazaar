import React, { useState } from "react";
import downArrow from "./../../assets/icons/down-arrow.webp";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const NavItem = ({ icon, hovered, text, dropdownItem, path }) => {
  const [itemHovered, setHovered] = useState(false);
  // console.log(dropdownItem);
  return (
    <>
      {path ? (
        <NavLink
          to={path}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`flex overflow-x-hidden justify-between group transition items-center ${
              text && "hover:bg-grey-light hover:text-black cursor-pointer"
            } p-1 rounded-md`}
          >
            <div className="flex gap-[10px] items-center">
              <span className="fill-white">{icon}</span>
              {<h2>{text}</h2>}
            </div>

            {dropdownItem?.length ? (
              // <img
              //   src={downArrow}
              //   alt="downarrow"
              //   className={`w-[9px] h-[5px] ${
              //     itemHovered && "rotate-180"
              //   } transition`}
              // />
              <FaChevronDown className="text-white" />
            ) : (
              <></>
            )}
          </div>
          {dropdownItem ? (
            <ul
              style={{ height: itemHovered ? "100%" : "0", overflow: "hidden" }}
              className="transition duration-1000"
            >
              {dropdownItem.map(({ text, dropdownPath }, key) => (
                <Link
                  to={dropdownPath}
                  key={key}
                  className="py-2 hover:bg-grey-light pl-5 pr-2 rounded-md cursor-pointer block transition hover:text-black"
                >
                  {text}
                </Link>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </NavLink>
      ) : (
        <div
          // to={path}
          className="overflow-x-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className={`flex justify-between items-center ${
              text && "hover:bg-grey-light hover:text-black cursor-pointer"
            } py-2 px-[10px] rounded-md`}
          >
            <div className="flex gap-[10px] items-center">
              {icon}
              {<h2>{text}</h2>}
            </div>

            {dropdownItem && hovered ? (
              // <img
              //   src={downArrow}
              //   alt="downarrow"
              //   className={`w-[9px] h-[5px] ${
              //     itemHovered && "rotate-180"
              //   } transition`}
              // />
              <FaChevronDown
                className={`${itemHovered && "rotate-180"} transition`}
              />
            ) : (
              <></>
            )}
          </div>
          {dropdownItem ? (
            <ul
              style={{ height: itemHovered ? "100%" : "0", overflow: "hidden" }}
              className="transition duration-1000"
            >
              {dropdownItem.map(({ text, dropdownPath }, key) => (
                <Link
                  to={dropdownPath}
                  key={key}
                  className="py-2 hover:bg-grey-light pl-5 pr-2 rounded-md cursor-pointer block hover:text-black transition"
                >
                  {text}
                </Link>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default NavItem;
