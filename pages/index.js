import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios"

export default function Home({ data, currentDate, github }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{data.name}</p>
        <p>{currentDate}</p>
        <p>{JSON.stringify(github)}</p>
      </main>

    </div>
  )
}

export async function getStaticProps() {
  //const res = await axios.get("http://localhost:3000/api/hello");
  const json = {}//res.data;
  const currentDate = new Date();
  let responseGitHub;
  try {
    const github = await axios.get("https://api.github.com/users/raj66");
    responseGitHub = github.data;
  } catch (error) {
    responseGitHub = {};
  }

  return {
    props: {
      data: json,
      currentDate: currentDate.toTimeString(),
      github: responseGitHub
    },
  }
}

/*
Error.getInitialProps = ({ res, req, err }): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    if (req.url.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash
        });
        res.end();
      }
      else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return { statusCode };
};
*/


