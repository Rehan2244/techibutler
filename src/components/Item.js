import React, { useCallback, useEffect, useState } from "react";
const Item = ({ item, onItemClick }) => {
  const [postId, setPostId] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const handleItemClick = useCallback(() => {
    onItemClick(item.id);
    setPostId(item.id);
  }, [item]);
  const loadData = useCallback(() => {
    if (postId) {
      console.log("Re rendering item because of changes...");
      return fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
        .then((response) => response.json())
        .then((data) => setData(data));

    }
  }, [postId]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  useEffect(() => setLoading(false), [data]);
  useEffect(() => {}, [postId]);
  return (
    <div
      className={`card ${item.isOpen && "active"}`}
      style={{ cursor: "pointer" }}
      onClick={handleItemClick}
    >
      <div className="cardContent">
        <span className="title">
          {item.isOpen && <span> #{item.id}</span>} {item.title}{" "}
        </span>
        {item.isOpen && data && !loading ? (
          <div>
            <div className="description">{item.body}</div>
          </div>
        ) : (
          item.isOpen && <div>Loading..</div>
        )}
      </div>
    </div>
  );
};

export default Item;
