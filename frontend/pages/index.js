import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OmniChannel test</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://omnichannel-test.herokuapp.com/assets/modules/channel-web/inject.js"></script>
        <script dangerouslySetInnerHTML={{__html: `window.botpressWebChat.init({ host: 'https://omnichannel-test.herokuapp.com/', botId: 'create-user' })`}} />

      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem-vindo ao app OmniChannel
        </h1>

        <p className={styles.description}>
          Clique no chat
        </p>

      </main>

      <footer className={styles.footer}>
          {'Codificado por  '}<a href="http://github.com/israelmarmar">@israelmarmar</a>
      </footer>
    </div>
  )
}
