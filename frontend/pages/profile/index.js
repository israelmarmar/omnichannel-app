import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../../services/api';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Profile() {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    (async ()=>{
        try{
        const {data} = await api.get('me',{
            headers: {
              'x-access-token': token
            }
        });
        setName(data.user.name);
        setEmail(data.user.email);
        setAddress(data.user.address);
        }catch(error){
            console.log(error);
        }
    })();
  });

  return (
    <div className={styles.container}>

      <Head>
        <title>OmniChannel test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <p className={styles.description}>
          nome: {name}
        </p>

        <p className={styles.description}>
          email: {email}
        </p>
        
        <p className={styles.description}>
          endrereço: {address}
        </p>

      </main>

      <footer className={styles.footer}>
          {'Codificado por  '}<a href="http://github.com/israelmarmar">@israelmarmar</a>
      </footer>
    </div>
  )
}
