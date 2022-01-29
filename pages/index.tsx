import React, { useCallback, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "../styles/Home.module.css";
import { AppHeader } from "../components/AppHeader";

const getHolidaysByYearAndCountry = async (
  year: number,
  country: string
): Promise<[Record<string, any>]> => {
  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`
  );
  const raw = await res.json();
  const hashTable = {};

  // API is providing duplicates, filter them out
  const data = raw.filter((obj) => {
    if (!hashTable[obj.name]) {
      hashTable[obj.name] = true;
      return true;
    } else {
      return false;
    }
  });
  return data;
};

export default function Home({ data, server }) {
  const [holidays, setHolidays] = useState<[Record<string, any>]>(data);
  const [country, setCountry] = useState<string>("US");
  const [isSSR, setIsSSR] = useState<boolean>(server);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = useCallback(
    async (e: SelectChangeEvent) => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      const newCountry = e.target.value as string;

      setCountry(newCountry);
      setIsLoading(true);
      setIsSSR(false);

      const year = new Date().getFullYear();
      const newData = await getHolidaysByYearAndCountry(year, newCountry);

      setHolidays(newData);
      setIsLoading(false);
    },
    [country, holidays, isLoading, isSSR]
  );

  // Placeholder spinner for loading state
  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={300} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Local Holidays 1.0</title>
        <meta
          name="description"
          content="Example React, TypeScript, Next.js App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader logo={"Local Holidays 1.0"} />

      <main className={styles.main}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            minWidth: "550px",
            marginBottom: "2rem",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={handleChange}
            >
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="CN">China</MenuItem>
              <MenuItem value="FR">France</MenuItem>
              <MenuItem value="DE">Germany</MenuItem>
              <MenuItem value="IE">Ireland</MenuItem>
              <MenuItem value="MX">Mexico</MenuItem>
              <MenuItem value="RU">Russia</MenuItem>
              <MenuItem value="ZA">South Africa</MenuItem>
              <MenuItem value="ES">Spain</MenuItem>
              <MenuItem value="GB">United Kingdom</MenuItem>
              <MenuItem value="US">United States</MenuItem>
            </Select>
          </FormControl>
        </div>

        <TableContainer component={Paper} sx={{ maxWidth: 550 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Holiday Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Global Holiday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holidays &&
                holidays.map((holiday) => (
                  <TableRow key={holiday.name}>
                    <TableCell component="th" scope="row">
                      {holiday.name}
                    </TableCell>
                    <TableCell align="right">{holiday.date}</TableCell>
                    <TableCell align="right">
                      {holiday.global ? "YES" : "NO"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isSSR ? (
          <p className={styles.description} style={{ marginBottom: 0 }}>
            This page was pre-rendered with Next.js Server Side Rendering,
            meaning we have SEO support out of the box. 'Aint that cool?
          </p>
        ) : (
          <p className={styles.description} style={{ marginBottom: 0 }}>
            But with Next, we can still rely on client code for dynamic
            applications! That API call was made in the browser.
          </p>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

/**
 * Next.js Server Side Rendering
 * Calls the API on the server and pre-renders the page HTML before serving
 * to user
 * @returns props to pass to the page component
 */
export async function getServerSideProps() {
  // Fetch data from external API
  const year = new Date().getFullYear();
  const data = await getHolidaysByYearAndCountry(year, "US");

  // Pass data to the page via props key
  return { props: { data, server: true } };
}
