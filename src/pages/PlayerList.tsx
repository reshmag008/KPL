import React, { useEffect, useState } from 'react';
import PlayerService from '../services/PlayerService';
import logo from "../assets/icon.jpeg"; 
import { usePDF } from 'react-to-pdf';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from "react-js-loader";
import { BACKEND_URL } from '../constants';
import gradient from "../assets/gradient7.jpg"
import n05 from "../assets/n05.png"



const PlayerList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [players, setPlayers] = useState<any>([]);
    const [soldCount, setSoldCount] = useState(0);
    const [unSoldCount, setUnSoldCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const { toPDF, targetRef } = usePDF({filename: 'ppl_players.pdf'});

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(()=>{
        setPlayers([]);
        GetAllPlayers();
    },[])
   
    const GetAllPlayers = () => {
        setIsLoading(true);
        try {
            PlayerService().getAllPlayers().then((response:any)=>{
                setIsLoading(false);
                setPlayers(response?.data?.players);
                setSoldCount(response?.data?.soldPlayerCount);
                setUnSoldCount(response?.data?.unSoldPlayerCount);
                setPendingCount(response?.data?.pendingPlayerCount);
                console.log("player== ", players)
            })
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching players:', error);
        }
    };

    return (
        <>
        <Header/>
        <div style={playerCountStyle}>

        {isLoading && <Loader type="spinner-cub" bgColor={'#194564'} color={'#194564'} title={"Loading Players..."} size={50} /> }


            <span style={{marginTop:'20px', color:'#194564'}}>
            Total Players : {players && players.length? players.length:0} | Unsold : {unSoldCount} | Sold : {soldCount} | Pending : {pendingCount} 
            </span>
            {/* <button style={{marginLeft:'20px'}} onClick={() => toPDF()}>Download PDF</button> */}
             {/* <button onClick={() => generatePDF(getTargetElement, options)}>Generate PDF</button> */}
            </div>
        
        {(players && players.length)&&
        <div id='content-id' ref={targetRef}  style={playerListContainer}>
            {players.map((player:any, index:number) => (
                <>
                <div style={players__card__wrap} key={index}>
                    <div style={cardHeader}>
                        {/* <img src={kplImage} alt='logo' style={imageStyle} /> */}
                        <span style={cardIconTextStyle}>KPL</span>
                        <div style={cardHeaderTextStyle}>   
                            <h2 style={cardTitleStyle}>Kavumbhagam</h2>
                            <h2 style={cardSubHeader}>Premier League</h2>
                            <h2 style={cardSubHeader}>Season 1</h2>
                        </div>
                        <img src={logo} alt='logo' style={imageStyle1} /> 
                    </div>

                    <div style={cardHeader}>
                        {/* <img src={BACKEND_URL + '/player_images/' + player.profile_image} alt='logo' style={profileImageStyle} />  */}
                        <img src={`https://drive.google.com/thumbnail?id=${player.profile_image}&z=w1000`} alt="logo" style={profileImageStyle}/>

                        <div style={cardBodyTextStyle}> 
                            
                            <div style={{display:'flex'}}>
                                <span style={fullNameText}> Reg#:{player.id} </span>
                                <span style={fullNameText}>{player.fullname.toUpperCase()}</span>
                            </div>

                            {/* <div style={{display:'flex'}}>
                                <span style={spanText}> Reg#:{player.id}</span>
                            </div> */}

                            <div style={{display:'flex'}}>
                                <span style={spanText}>Location : {player.location} </span>
                                <span style={spanText}>Role : {player.player_role}</span>
                            </div>

                            {/* <div style={{display:'flex'}}>
                                <span style={spanText
                                    }>Role : {player.player_role}</span>
                            </div> */}

                            <div style={{display:'flex'}}>
                                <span style={spanText}>Batting : {player.batting_style}</span>
                                <span style={spanText}>Bowling : {player.bowling_style}</span>
                            </div>

                            {/* <div style={{display:'flex'}}>
                                <span style={spanText}>Bowling : {player.bowling_style}</span>
                            </div> */}

                            

                            <div style={{display:'flex'}}>
                                <span style={spanText}> Jersey No : {player.jersey_no}</span>
                                <span style={spanText}>Jersey Size: {player.jersey_size}</span>
                            </div>

                            {/* <div style={{display:'flex'}}>
                                <span style={spanText}>Jersey Size: {player.jersey_size}</span>
                            </div> */}

                            <div style={{display:'flex'}}>
                                <span style={spanText}>Contact : {player.contact_no}</span>
                                <div style={n05IconStyle}>
                                    <img src={n05} alt='logo' style={no5Style} />
                                </div>
                            </div>

                           
                        
                        </div>
                    </div>
                    <div style={cardFooter}>

                    </div>
                </div>
                </>
            ))}
        </div>
        }



        <Footer/>
        </>
    )
}

const playerListContainer: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(26rem, 1fr))',
    gap: '2rem',
    maxWidth: '120rem',
    margin: '0 auto',
    padding: '2rem',
}

const cardIconTextStyle: React.CSSProperties = {
    padding: '10px',
    cursor: 'pointer',
    color: 'yellow',
    textAlign: 'left',
    fontSize: '50px',
    textShadow: "1px 1px 0 #f00, 2px 2px 0 #f00, 3px 3px 0 #f00",
    fontWeight:"bolder",
    fontStyle:'italic'
  };

const cardSubHeader : React.CSSProperties = {
    fontSize: '25px',
    fontFamily: 'auto',
    marginTop: '-26px',
    textAlign: 'center'
}

const cardHeaderTextStyle: React.CSSProperties = {
    gap: '2rem',
    cursor: 'pointer',
    color: 'yellow',
    textAlign: 'left',
    fontSize: '23px',
    // textShadow: '1px 1px 0 #999, 2px 2px 0 #999, 3px 3px 0 #999',
  };

  const cardBodyTextStyle: React.CSSProperties = {
    color: 'white',
    textAlign: 'left',
    fontSize: '23px',
  };

const n05IconStyle : React.CSSProperties = {
    display:'flex', justifyContent:'end', marginLeft:"95px"
}

const imageStyle1 : React.CSSProperties = {
    height : '6rem',
    width: '6rem',
    padding:'5px',
    // borderRadius: '50%',
    // objectFit: 'cover',
    // border: 'none'
}

const spanText :  React.CSSProperties = {
    marginTop: '8px', 
    fontWeight: 'bold', 
    fontSize: '13px',
    paddingLeft : '10px',
    paddingTop : '8px'
}

const fullNameText :  React.CSSProperties = {
    marginTop: '10px', 
    fontWeight: 'bold', 
    fontSize: '17px',
    paddingLeft : '10px'
}

const svgStyle :React.CSSProperties = {
    height : '1rem',
    width: '1rem',
    objectFit:'cover',
    padding:'10px',
    filter: 'invert(85%) sepia(20%) saturate(150%) hue-rotate(200deg) brightness(120%) contrast(120%)'

}

const profileImageStyle : React.CSSProperties = {
    height: '10rem',
    width: '8rem',
    padding: '5px',
    alignItems: 'flex-start',
    display: 'grid',
    marginTop: '-10px',
    objectFit:'cover',
    borderRadius : "50%"
}

const players__card__wrap :  React.CSSProperties = {
    gap: '2rem',
    // backgroundImage: 'linear-gradient(to top,  #000033 , #800080)',
    // backgroundImage :"linear-gradient(#194564,#4c8dba, #194564)",
    backgroundImage : `url(${gradient})`,
    border: '1px solid #ccc', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
    borderRadius: '8px', 
    margin: '0 auto',
    marginTop:'25px'
  }

const no5Style : React.CSSProperties = {
    height : "3rem",
    width : "3rem",
    borderRadius : "50%"
}

const cardHeader :  React.CSSProperties = {
    display: 'flex'
}

const cardFooter :  React.CSSProperties = {
    display: 'flex',
    backgroundColor : 'purple',
    marginBottom:'10px'
}

const playerCountStyle : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const cardTitleStyle : React.CSSProperties = {
    fontSize: '32px',
    fontFamily: 'auto',
    marginTop:'8px',
    textAlign: 'center'
}

const isMobile = window.matchMedia("(max-width: 600px)").matches;
    if (isMobile) {
        playerCountStyle.fontSize = '12px'; // Adjust font size for mobile view
        playerCountStyle.padding = '10px'

        playerListContainer.gridTemplateColumns =  'repeat(auto-fit, minmax(18rem, 1fr))'
        playerListContainer.padding =  '0rem'

        players__card__wrap.margin = '10px'

        cardIconTextStyle.fontSize = "35px"
        cardIconTextStyle.marginTop = "15px";

        cardSubHeader.fontSize = '20px';
        cardTitleStyle.fontSize = '26px';

        spanText.paddingLeft = '5px';
        n05IconStyle.marginLeft = '80px'
        no5Style.marginTop = '5px'

    }


export default PlayerList;