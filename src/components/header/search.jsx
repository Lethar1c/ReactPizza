export default function Search({ searchValue, setSearchValue }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        name=""
        id=""
        placeholder="Поиск..."
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>
  );
}
