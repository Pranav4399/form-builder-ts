import {FC} from "react"

const style = {
    color: "black",
    padding: "5px",
    fontFamily: "Arial",
    width: "100px"
};

const Textbox: FC = () => {
    return(
        <input style={style} placeholder="Enter Text" />
    )
}

export default Textbox;