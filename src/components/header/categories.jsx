import React from "react";

export default function Categories({
  list,
  setSearchingCategory,
  searchingCategory,
}) {
  return (
    <div className="categories">
      <ul>
        {list.map((element, index) =>
          index === searchingCategory ? (
            <li
              className="active"
              onClick={() => setSearchingCategory(index)}
              key={index}
            >
              {element}
            </li>
          ) : (
            <li onClick={() => setSearchingCategory(index)} key={index}>
              {element}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
