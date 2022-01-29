import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { AppHeader } from "../components/AppHeader";

export default function Home({ data }) {
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

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        <div style={{ display: "block" }}>
          {data &&
            data.map((data, idx) => (
              <p key={idx}>{data.date + ", " + data.name}</p>
            ))}
        </div>
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
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
