import { useState } from "react";
import { AsyncTypeahead, Highlighter } from "react-bootstrap-typeahead";
import { useHistory } from "react-router-dom";
import { searchUser } from "../../services/UserService";

const SearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const history = useHistory();

  const handleSearch = (query) => {
    setIsLoading(true);
    searchUser(query).then((res) => {
      setOptions(res);
      setIsLoading(false);
    });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="search-user"
      isLoading={isLoading}
      labelKey="username"
      minLength={1}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for user..."
      onChange={(selected) => {
        if (selected && selected[0] && selected[0].id) {
          history.push(`/profile/${selected[0].id}`, {
            type: selected[0].type,
          });
        }
      }}
      renderMenuItemChildren={(option, props) => (
        <div className="search-dropdown-item">
          <img
            alt="pic"
            src={`https://picsum.photos/200/300?random=${option.id}`}
            style={{
              height: "24px",
              marginRight: "10px",
              width: "24px",
            }}
          />
          <Highlighter highlightClassName="highlight" search={props.text}>
            {option.username}
          </Highlighter>
        </div>
      )}
    />
  );
};
export default SearchUser;
