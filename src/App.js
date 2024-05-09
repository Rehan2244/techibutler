import React, { useState, useEffect, useMemo } from "react";
import Item from "./components/Item";
import Paginator from "./components/Paginator";
import "./App.css";
const Home = () => {
  const [data, setData] = useState([]);
  const [calcTime, setCalcTime] = useState(0);
  const [selectedData, setSelectedData] = useState({
    id: undefined,
    isOpen: false,
  });
  const [paginatedData, setPaginatedData] = useState();
  useEffect(() => {
    setCalcTime(new Date().getTime());
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  const computedData = useMemo(() => {
    const result = data.map((item) => {
      return {
        ...item,
        isOpen: false,
        isFavourite: false,
      };
    });
    const checkId = (item) => {
      if (selectedData.id == item.id) {
        return !item.isOpen;
      } else {
        return false;
      }
    };
    if (selectedData) {
      return result.map((item) => ({
        ...item,
        isOpen: checkId(item),
      }));
    }

    return result;
  }, [data, selectedData]);
  useEffect(() => {
    if (calcTime) {
      let newTime = Math.abs(new Date().getTime() - calcTime) / 1000;
      setCalcTime(newTime);
    }
  }, [computedData]);
  const changeVisibleData = (id) => {
    setCalcTime(new Date().getTime());
    let result = data.filter((item) => {
      if (item.id == id) {
        item.isOpen = !item.isOpen;
        return item.id == id;
      }
    });
    // using deep copy to trigger side effect here
    setSelectedData({ ...result[0] });
  };
  return (
    <div>
      <div className="calculationDiv">
        Calculation time is: {calcTime.toPrecision()} seconds{" "}
        <span>*calculates on data selection and data load from api</span>{" "}
      </div>
      {paginatedData &&
        paginatedData.map((item) => (
          <Item
            key={item.id}
            item={item}
            onItemClick={(e) => {
              {
                changeVisibleData(e);
              }
            }}
          />
        ))}
      {!!computedData && (
        <Paginator
          currentPage={1}
          pageLength={10}
          data={computedData}
          getData={setPaginatedData}
        />
      )}
    </div>
  );
};

export default Home;
