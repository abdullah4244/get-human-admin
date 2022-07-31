import React from 'react';
import {  Spin,AutoComplete,Input } from 'antd';
import debounce from 'lodash/debounce';
import {useHistory} from "react-router-dom"

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const history = useHistory();
  console.log(options , "state")
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        const result = newOptions.length ? [...newOptions]  : [{label : "No Search Found" ,value : ""}]
        setOptions(result);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  const selectOrganizationHandler = (e) => {
      history.push(`/${e}`)
  }
  return (
      <div className='debounceSelect' style={{marginTop :"3px"}}>
            <AutoComplete
      className="SearchOrganization "
      options={options}
      onSearch={debounceFetcher}
      onSelect = {(e)=>selectOrganizationHandler(e)}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      <Input.Search size="large" placeholder="input here" enterButton />
    </AutoComplete>
    </div>
  );
}
export default DebounceSelect