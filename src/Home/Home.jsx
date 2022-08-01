import s from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import iconRandom from "../images/icon-dice.svg";
import patternDivider from "../images/pattern-divider-desktop.svg";

const Home = () => {

    const [frase, setFrase] = useState({});
    const [loading, setLoading] = useState(false);

    const randomAdvice = async ()  =>{
        setLoading(true);
        const resp = await fetch("https://api.adviceslip.com/advice",{ cache: "no-cache" });
        if(resp){
            const data = await resp.json();
            setLoading(false);
            setFrase(data.slip);
        }

    }

    useEffect(()=>{
        axios.get("https://api.adviceslip.com/advice")
        .then(data =>{
        setFrase(data.data.slip);
        })
    },[]);   


    if(loading){
        return(
            <main className={s.container}>
                <h1 style={{ opacity: 0, width: 0 }}>Advice Generator</h1>
                 <div className={s.card}>
                    <div className={s.flex}>
                        <div className={s.ldsRing}><div></div><div></div><div></div><div></div></div>
                    </div>
                     <button className={s.randomButton} onClick={randomAdvice} ><img src={iconRandom} alt="" /></button>
                    <img className={s.pattern} src={patternDivider} alt="" />
                 </div>

            </main>
        )
    }else{
        return (
            <main className={s.container}>
                <h1 style={{ opacity: 0, width: 0 }}>Advice Generator</h1>
                 <div className={s.card}>
                     <span className={s.texto}>ADVICE #{frase.id && frase.id}</span>
                     <div className={s.textContainer}>
                        <p className={s.advice}>"{frase.id && frase.advice}"</p>
                     </div>
                     <button className={s.randomButton} onClick={randomAdvice} ><img src={iconRandom} alt="" /></button>
                    <img className={s.pattern} src={patternDivider} alt="dado" />
                 </div>
            </main>
         )
    }


}


export default Home;
