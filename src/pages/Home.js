import { useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home(props) {
  const capitals = useSelector((state) => state.capitals.capitals);

  return (
    <div>
      <ul>
        {capitals.map((city) => {
          return (
            <Link key={city} to={`/weather/${city}`}>
              <li className="cityItem">{city}</li>
            </Link>
          );
        })}
        <li className="addItem">
          <Link to="/add" className="addButton">
            <BsPlusLg size={45} strokeWidth={2} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
