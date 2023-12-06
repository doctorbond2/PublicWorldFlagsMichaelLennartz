import React from "react";
import { Card, CardHeader, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const CCard = ({ info, unlocked }) => {
  const [showMore, setShowMore] = useState(false);
  let altNames = info.altSpellings.map((x) => x);

  return (
    <>
      <Card
        style={{
          width: "18rem",
          minHeight: "25rem",
          backgroundColor: "lightgray",
        }}
      >
        <Card.Img
          onClick={() => {
            setShowMore(!showMore);
          }}
          variant="top"
          src={info && info.flags.png}
          fluid
          style={{ minHeight: "10rem", height: "10rem" }}
        />
        {unlocked && showMore && (
          <div>
            <h3>
              Continents: {info && info.continents.map((x) => <p>{x}</p>)}
            </h3>
          </div>
        )}
        <Card.Body style={{ borderTop: "1px solid gray", borderRadius: "3px" }}>
          <Card.Title>
            {info.name.common} <br></br>
            <small>{`(${altNames && altNames})`}</small>
          </Card.Title>

          <Card.Text>
            <h6>
              Capital: {info.capital[0] ? info.capital[0] : "No capital found"}
            </h6>
          </Card.Text>
          <Card.Footer>
            <Card.Text>
              Spoked languages:{" "}
              {info.languages &&
                Object.keys(info.languages).map((x) => (
                  <h6>{info.languages[x]}</h6>
                ))}
            </Card.Text>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export default CCard;
