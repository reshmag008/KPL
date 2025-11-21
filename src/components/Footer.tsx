import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return(
        <footer style={footerStyle}>

                <p style={copyRightStyle}>&copy; {new Date().getFullYear()}
                </p>

                <div style={copyRightStyle}><p>BK Auction Arena</p></div>

            
        </footer>
    )
}

const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex', 
    backgroundColor : 'yellow',
  };

const copyRightStyle : React.CSSProperties = {
    color: 'black',
    fontWeight : 'bolder',
    marginLeft: '10px',
    alignItems: 'left'
}


export default Footer;