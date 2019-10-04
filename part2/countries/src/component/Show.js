import React from 'react';
import { Lang } from './Lang';
export const Show = ({ select }) => {
  const langs = () => select.languages.map(content => {
    return (<Lang name={content.name} key={content.name} />);
  });
  return (<div>
    <h2>{select.name}</h2>
    <p>Capital: {select.capital}</p>
    <p>Population: {select.population}</p>
    <h3>Languages</h3>
    <ul>{langs()}</ul>
    <img src={select.flag} alt='country flag' height='100' width='100' />
  </div>);
};
