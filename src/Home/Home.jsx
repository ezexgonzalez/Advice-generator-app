import s from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import iconRandom from "../images/icon-dice.svg";
import patternDivider from "../images/pattern-divider-desktop.svg";

const Home = () => {

    const [frase, setFrase] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        axios.get("https://api.adviceslip.com/advice")
        .then(data =>{
        setFrase(data.data.slip);
        })
    },[]);   

    const randomAdvice = () =>{
        setLoading(true);

        axios.get("https://api.adviceslip.com/advice")
        .then(data =>{
            setFrase(data.data.slip);
            setLoading(false);
        });
    }


    if(loading){
        return(
            <main className={s.container}>
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
