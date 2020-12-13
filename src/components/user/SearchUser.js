import { useState } from "react";
import {
  AsyncTypeahead,
  Highlighter,
  MenuItem,
} from "react-bootstrap-typeahead";
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
        history.push(`/viewProfile/${selected[0].username}`);
      }}
      renderMenuItemChildren={(option, props) => (
        <MenuItem wrap="nowrap" className="search-dropdown-item">
          <img
            alt="pic"
            src={`https://picsum.photos/200/300?random=${option.id}`}
            style={{
              height: "24px",
              marginRight: "10px",
              width: "24px",
            }}
          />
          <Highlighter search={props.text}>{option.username}</Highlighter>
        </MenuItem>
      )}
    />
  );
};
export default SearchUser;
