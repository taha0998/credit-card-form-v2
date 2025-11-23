import { useState } from "react";
import VisaSvg from "../images/Visa.svg";

const Card = ({ setIsLoading }) => {
  const [data, setData] = useState({
    name: "",
  });
  const [cardHolder, setCardHolder] = useState("XXX XXXXX");
  const [cardNumber, setCardNumber] = useState("0000000000000000");
  const [date, setDate] = useState([Number("0"), Number("0")]);
  const [cvv, setCvv] = useState("000");

  const [backCard, setBackCard] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    if (name === "name" && value.length > 0) setCardHolder(value);
    else if (name === "name" && value === "") setCardHolder("XXX XXXXX");

    if (name === "number" && value.length > 0) {
      value = value.slice(0, 16);
      setCardNumber(value);
    } else if (name === "number" && value === "")
      setCardNumber("0000000000000000");

    if (name === "day" && value.length > 0) {
      value = value.slice(0, 2);
      setDate((prevDate) => [value, prevDate[1]]);
    } else if (name === "day" && value === "") {
      setDate((prevDate) => ["00", prevDate[1]]);
    }

    if (name === "year" && value.length > 0) {
      value = value.slice(0, 2);
      setDate((prevDate) => [prevDate[0], value]);
    } else if (name === "year" && value === "") {
      setDate((prevDate) => [prevDate[0], "00"]);
    }

    if (name === "cvv" && value.length > 0) {
      setBackCard(true);
      value = value.slice(0, 3);
      setCvv(value);
    } else if (name === "cvv" && value === "") {
      setCvv("000");
    } else {
      setBackCard(false);
    }

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data?.number.length !== 16) {
      alert("Card Number must be 16 Numbers");
    } else if (data?.cvv.length !== 3) {
      alert("CVV must be 3 Numbers");
    } else {
      setIsLoading(true);
    }
  };
  return (
    <div className="card-container">
      {backCard ? (
        <div className="back-card-container">
          <h3>{cvv}</h3>
          <div className="yellow-tap"></div>
        </div>
      ) : (
        <div className="credit-card-container">
          <div className="card-logo-container">
            <img src={VisaSvg} alt="Visa logo" />
          </div>
          <div className="info-container">
            <div className="info">
              <h2>Expiry:</h2>
              <p>
                {date[0]
                  ? date[0].length <= 1
                    ? `0${date[0]}`
                    : date[0]
                  : "00"}
                /
                {date[1]
                  ? date[1].length <= 1
                    ? `0${date[1]}`
                    : date[1]
                  : "00"}
              </p>
            </div>
            <div className="info">
              <h2>Card holder:</h2>
              <p>{cardHolder}</p>
            </div>
          </div>
          <div className="card-number-container">
            <div className="card-number">
              <h2>{cardNumber}</h2>
            </div>
          </div>
        </div>
      )}
      <div className="form-container">
        <div className="form-spacer"></div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name on Card</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              maxLength={35}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="number">Card Number</label>
            <input
              id="number"
              name="number"
              type="number"
              placeholder="Card Number"
              value={data.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="multi-inputs">
            <div className="input-container">
              <label>Expiry date</label>
              <div className="multi-inputs-date">
                <input
                  id="day"
                  name="day"
                  type="number"
                  value={data.day}
                  onChange={handleChange}
                  placeholder={`0${new Date().getDay()}`}
                  required
                />
                <span>/</span>
                <input
                  id="year"
                  name="year"
                  type="number"
                  value={data.year}
                  onChange={handleChange}
                  placeholder={new Date().getFullYear() - 2000}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                type="number"
                value={data.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Card;
