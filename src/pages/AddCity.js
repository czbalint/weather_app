import "../styles/AddCity.css";
import AutoCompleteSearch from "../components/AutoFillSearch";
import { MdArrowBackIos } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCity } from "../redux/capitals";

export default function AddCity(params) {
  const [selectedValue, setSelectedValue] = useState("");

  const dispatch = useDispatch();

  const btnClick = (event) => {
    dispatch(addCity(selectedValue));
  };

  return (
    <div>
      <Link to={"/"}>
        <MdArrowBackIos className="backBtn" size={30} />
      </Link>
      <AutoCompleteSearch
        selectValue={(value) => {
          setSelectedValue(value);
        }}
      />
      {selectedValue !== "" ? (
        <Link to={"/"}>
          <button className="saveBtn" onClick={btnClick}>
            Save
          </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
