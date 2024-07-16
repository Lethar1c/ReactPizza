import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../../redux/slices/filterSlice";

export default function Categories({list}) {
  const searchingCategory = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();
  const setSearchingCategory = (category) =>
    dispatch(setCategory(category));

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
