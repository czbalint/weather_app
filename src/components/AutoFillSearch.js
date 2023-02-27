import "../styles/AutoFillSearch.css";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";

export default function AutoCompleteSearch(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);
  const [cityAutoFiltered, setCityAutoFiltered] = useState([]);
  const [word, setWord] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const usedCapitals = useSelector((state) => state.capitals.capitals);

  useEffect(() => {
    const getData = () => {
      fetch("capitals.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          let tmpData = [];

          myJson.forEach((element) => {
            if (!usedCapitals.includes(element.city)) {
              tmpData.push(element.city);
            }
          });

          setData(tmpData);
        });
    };
    window.addEventListener("resize", handleResize);
    getData();
  }, []);

  useEffect(() => {
    props.selectValue(selectedCity);
  }, [selectedCity]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 810);
  };

  const handleChange = (event) => {
    setCityAutoFiltered([]);
    setSelectedCity("");
    let inputString = event.target.value;

    if (inputString === "") {
      setWord("");
      return;
    }

    setWord(inputString);
    setCityAutoFiltered(
      data
        .filter((value) => {
          return cityFilter(value, inputString);
        })
        .slice(0, 8)
    );
  };

  const handleClick = (event, city) => {
    setWord(city);
    setSelectedCity(city);
    setCityAutoFiltered(
      data
        .filter((value) => {
          return cityFilter(value, city);
        })
        .slice(0, 8)
    );
  };

  function cityFilter(value, input) {
    return value.toLowerCase().includes(input.toLowerCase());
  }

  return (
    <div className={isMobile ? "container-m" : "container"}>
      <FaChevronDown className="icon" size={25} />
      <input onChange={handleChange} value={word}></input>
      <ul>
        {cityAutoFiltered.map((city) => {
          return (
            <li
              className="autoField"
              key={city}
              onClick={(event) => {
                handleClick(event, city);
              }}
            >
              <Highlighter
                highlightClassName="hightlightSub"
                autoEscape={true}
                searchWords={[word]}
                textToHighlight={city}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
