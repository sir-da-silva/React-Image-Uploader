import { createRoot } from "react-dom/client"
import "./confirm-styles.css"

export function Confirm (icon, title, text, btn1, func1, btn2, func2) {
    
    const container = document.createElement('div')
    document.body.appendChild(container)

    const remove = () => {document.body.removeChild(container)}

    const popup = <>
        <div className={"popup ignore-popup"} onClick={(e) => e.target.classList.contains('ignore-popup') && remove()}>
            <div className={"box"}>
                <i className={'icon fas fa-lg ' + icon}></i>
                <h3 className={"title"}>{title}</h3>
                {text && <span className={"text"}>{text}</span>}
                <div className={"buttons"}>
                    <button className={"button"} type="button" onClick={func1 ? () => { func1(); remove() } : remove}>{btn1}</button>
                    <button className={"button"} type="button" onClick={func2 ? () => { func2(); remove() } : remove}>{btn2}</button>
                </div>
            </div>
        </div>
    </>

    createRoot(container).render(popup)
}