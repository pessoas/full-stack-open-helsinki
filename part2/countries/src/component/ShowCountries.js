import React from 'react';
import { Lang } from './Lang';
import { Show } from './Show';
export const ShowCountries = (props) => {
  //console.log(props.list)
  if (!props.filter) {
    return <p>Enter your search on the field</p>;
  }
  else {
    const filtered = props.list.filter(content => {
      return content.name.toUpperCase().indexOf(props.filter.toUpperCase()) > -1;
    });
    console.log(filtered);
    if (filtered.length > 9) {
      return <p>Too many matches, specify another filter</p>;
    }
    else if (filtered.length === 1) {
      return <Show select={filtered[0]} />;
    }
    else {
      const counts = () => filtered.map(content => {
        return (<Lang name={content.name} key={content.name} />);
      });
      return (<ul>{counts()}</ul>);
    }
  }
};
