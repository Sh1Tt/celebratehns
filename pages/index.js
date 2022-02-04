import Head from "next/head";

import Image from "next/image";

import Form from "../components/Form/Domainrequest";

import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";

// import bgCelebrate from "../public/background.jpg";

export default function Home() {
    return (
        <>
            <Head>
                <title>Get your free .a☕/ | 🤝🎈✨ BIRTHDAY GIFT ✨🎈🤝 </title>
                <meta name="description" content="To celebrate the birthday of hns, i gift free .a☕ SLD's. Come get yours!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <span className={styles.videoWrapper}>
              {/*<Image src={bgCelebrate} alt="Happy birthday handshake free .a☕ give-a-way background picture." layout="fill" objectFit="cover" />*/}
              <video controls="" className={styles.Video} controlsList="nodownload" muted={true} loop={true} autoPlay={true} preload="auto" width="100%">
                <source src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/SKD-bqAkQjhvrjayf/videoblocks-animated-happy-birthday-text-in-4k-close-up-text-on-blue-background-luxury-and-elegant-dynamic-style-holiday-template_h1zr9g7vtw__301cd7e8a413f21d0e7d80257a50a974__P360.mp4" type="video/mp4" />
              </video>
            </span>
            <header className={styles.Header}>
              <div className={styles.container}>  
                <h1 className={styles.Title}>
                  Handshake 🎁
                </h1>
                <span className={styles.Slogan}>
                  <span>Get your free .a☕/</span>
                </span>
              </div>
            </header>
            <main className={styles.Main}>
              <div className={styles.container}>  
                <Form />
              </div>
            </main>
            <Footer />
        </>
    )

}
