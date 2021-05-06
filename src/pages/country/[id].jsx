import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './Country.module.css';

const getCountry = async id => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map(border => getCountry(border))
    );

    setBorders(borders);
  };

  const [borders, setBorders] = useState([]);

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.country_container}>
        <div className={styles.country_container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={`${country.name} flag`} />
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_nums}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Pupulation</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.country_container_right}>
          <div className={styles.detail_panel}>
            <h4 className={styles.detail_panel_heading}>Details</h4>

            <div className={styles.detail_panel_row}>
              <div className={styles.detail_panel_label}>Capital</div>
              <div className={styles.detail_panel_value}>{country.capital}</div>
            </div>

            <div className={styles.detail_panel_row}>
              <div className={styles.detail_panel_label}>Subregion</div>
              <div className={styles.detail_panel_value}>
                {country.subregion}
              </div>
            </div>

            <div className={styles.detail_panel_row}>
              <div className={styles.detail_panel_label}>Languages</div>
              <div className={styles.detail_panel_value}>
                {country.languages.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.detail_panel_row}>
              <div className={styles.detail_panel_label}>Currencies</div>
              <div className={styles.detail_panel_value}>
                {country.currencies.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.detail_panel_row}>
              <div className={styles.detail_panel_label}>Native Name</div>
              <div className={styles.detail_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.detail_panel_row}>
              <div className={styles.detail_panel_label}>Gini</div>
              <div className={styles.detail_panel_value}>{country.gini}%</div>
            </div>

            <div className={styles.detail_panel_row_border}>
              <div className={styles.detail_panel_border_label}>
                Neighbouring Countries
              </div>

              <div className={styles.detail_panel_row_border_container}>
                {borders.map(({ flag, name }) => (
                  <div
                    className={styles.detail_panel_border_country}
                    key={name}>
                    <img src={flag} alt={`Border with ${name} flag`} />
                    <div>{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  const paths = countries.map(country => ({
    params: { id: country.alpha3Code },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: { country },
  };
};
