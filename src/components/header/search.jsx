import { useDispatch } from "react-redux";
import { setSearchText } from "../../redux/slices/filterSlice";
import { useRef } from "react";

export default function Search() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        name=""
        id=""
        placeholder="Поиск..."
        onChange={(event) => dispatch(setSearchText(event.target.value))}
      />
    </div>
  );
}
