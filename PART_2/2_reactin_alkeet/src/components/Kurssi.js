import React from 'react';

const Kurssi = (props) => {
    return(
    <div>
    <Otsikko kurssi={props.kurssi}/>
    <Sisalto kurssi={props.kurssi}/>
    <Yhteensa kurssi={props.kurssi}/>
    </div>
    )
}

const Otsikko = (props) => {
    return (
    <h1>{props.kurssi.nimi}</h1>
    )
}

const Osa = ({osa}) => {
    return (
        <p>{osa.nimi} {osa.tehtavia}</p>
    )
}

const Sisalto = ({kurssi}) => {
    return (
        <div>
            {kurssi.osat.map(o=><Osa key={o.id} osa={o} />)}
        </div>
    )
}

const Yhteensa = ({kurssi}) => {
    
    return (
        <p>yhteensä {kurssi.osat.reduce((summa, seur) => summa + seur.tehtavia, 0)} tehtävää</p>
    )
}

export default Kurssi