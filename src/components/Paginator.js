import React, { useState, useEffect, useMemo } from "react";

const Paginator = ({
  pageLength,
  data,
  // on previous and on next can be used when we implement it to get previous or next data in pagination
  onPrevious,
  onNext,
  getData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (record.length) {
      getData(record);
    }
  }, [record]);
  useEffect(() => {
    fetchData();
  }, [data, currentPage]);

  const fetchData = () => {
    let firstRecord = (currentPage - 1) * pageLength;
    let lastRecord = currentPage * pageLength;
    const newData = data.slice(firstRecord, lastRecord);
    setRecord(newData);
  };

  const totalPages = useMemo(() => {
    return data.length / pageLength;
  }, [data]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div className="paginator">
        <button
          className="prev btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        ></button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="next btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        ></button>
      </div>
    </div>
  );
};

export default Paginator;
