import { createRoot } from "react-dom/client"

export function Confirm (icon, title, text, btn1, func1, btn2, func2) {

    const styles = {
        popup: {
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontFamily: "Arial"
        },
        box: {
            borderRadius: "10px 10px",
            background: "white",
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            maxWidth: "400px"
        },
        icon: {
            alignSelf: "center",
            width: "16px",
            height: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            border: "3px solid white",
            borderRadius: "50%",
            marginTop: "-20px",
            color: "white",
            background: "#BC0000",
        },
        title: {
            padding: "0 20px",
            color: "black",
        },
        text: {
            padding: "0 20px 20px 20px",
        },
        buttons: {
            display: "flex",
            justifyContent: "space-between",
            columnGap: "1px",
            paddingTop: "1px",
            background: "lightgray",
            borderRadius: "0 0 10px 10px",
            overflow: "hidden",
        },
        button: {
            padding: "15px",
            fontSize: "medium",
            fontWeight: "bold",
            width: "100%",
            border: "none",
            background: "white",
            cursor: "pointer",
            transition: '0.5s ease'
        }
    }

    const remove = () => {body.removeChild(parent)}

    const buttonMouseOver = (e) => {e.target.style.backgroundColor = 'lightgray'}
    const buttonMouseOut = (e) => {e.target.style.backgroundColor = 'white'}

    const popup = 
    <div className="popup ignore-popup"
        style={styles.popup}
        onClick={(e) => e.target.classList.contains('ignore-popup') && remove()}
    >
        <div style={styles.box}>
            <i className={`fa fa-lg ${icon}`} style={styles.icon}></i>
            <h3 style={styles.title}>{title}</h3>
            <span style={styles.text}>{text && (text)}</span>
            <div style={styles.buttons}>
                <button type="button" 
                    onClick={func1 ? () => {func1(); remove()} : remove } 
                    style={styles.button} 
                    onMouseOver={buttonMouseOver} 
                    onMouseOut={buttonMouseOut}
                >{btn1}</button>
                <button type="button"
                    onClick={func2 ? () => {func2(); remove()} : remove }
                    style={styles.button}
                    onMouseOver={buttonMouseOver}
                    onMouseOut={buttonMouseOut}
                >{btn2}</button>
            </div>
        </div>
    </div>

    const parent = document.createElement('div'); createRoot(parent).render(popup)
    const body = document.querySelector('body'); body.appendChild(parent)
}