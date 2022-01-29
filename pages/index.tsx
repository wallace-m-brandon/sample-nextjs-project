import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "../styles/Home.module.css";
import { AppHeader } from "../components/AppHeader";

export default function Home({ data, server }) {
  const [holidays, setHolidays] = useState(data);
  const [isSSR, setIsSSR] = useState(server);
  const btn = useCallback(async () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setIsSSR(false);
    const year = new Date().getFullYear();
    const newData = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/DE`
    );
    setHolidays(await newData.json());
  }, [holidays, isSSR]);

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
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

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
          <p className={styles.description}>
            This page was pre-rendered with Server Side Rendering. Aint that
            cool?
          </p>
        ) : (
          <p className={styles.description}>
            But with Next, we can still rely on client code for dynamic
            applications!
          </p>
        )}
        <Button onClick={btn}>Click me!</Button>
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
  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/US`
  );
  const raw = await res.json();
  const hashTable = {};

  //API is providing duplicates, filter them out
  const data = raw.filter((obj) => {
    if (!hashTable[obj.name]) {
      hashTable[obj.name] = true;
      return true;
    } else {
      return false;
    }
  });
  // Pass data to the page via props
  return { props: { data, server: true } };
}
