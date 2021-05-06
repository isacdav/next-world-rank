import { useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

const Home = ({ countries }) => {
  const [keyword, setKeyword] = useState('');

  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const handleInputChange = e => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>Found {countries.length} countries</div>

        <div className={styles.input}>
          <SearchInput
            onChange={handleInputChange}
            placeholder='Filter by Name, Region or Subregion'
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
