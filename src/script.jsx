
function Audio(props){
    return(
        <div>
                 <audio src="audio/0.mp3" id = "0"></audio>
                 <audio src="audio/1.mp3" id = "1"></audio>
                 <audio src="audio/2.mp3" id = "2"></audio>
                 <audio src="audio/3.mp3" id = "3"></audio>
                 <audio src="audio/4.mp3" id = "4"></audio>
                 <audio src="audio/5.mp3" id = "5"></audio>
                 <audio src="audio/6.mp3" id = "6"></audio>
                 <audio src="audio/7.mp3" id = "7"></audio>
                 <audio src="audio/8.mp3" id = "8"></audio>
                 <audio src="audio/9.mp3" id = "9"></audio>
        </div>
    );
}

function AudioDarkSide(props){
    return(
        <div>
                 <audio src="dark_side/0.mp3" id = "0"></audio>
                 <audio src="dark_side/1.mp3" id = "1"></audio>
                 <audio src="dark_side/2.mp3" id = "2"></audio>
                 <audio src="dark_side/3.mp3" id = "3"></audio>
                 <audio src="dark_side/4.mp3" id = "4"></audio>
                 <audio src="dark_side/5.mp3" id = "5"></audio>
                 <audio src="dark_side/6.mp3" id = "6"></audio>
                 <audio src="dark_side/7.mp3" id = "7"></audio>
                 <audio src="dark_side/8.mp3" id = "8"></audio>
                 <audio src="dark_side/9.mp3" id = "9"></audio>
        </div>
    )
}


const CButton = (props) => <button onClick = {props.onClick} className = {props.className}>{props.inner}</button>;

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.defFontSize = 60;
        this.state = {
        currentLine: "0",
        currentValue: 0,
        currentOperation: "none",
        currentValueRight: "none",
        currentFontSize : this.defFontSize,
        fontScope: "none",
        clickCounter: 0
    };
        this.handleChange = this.handleChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.audio = <Audio/>;
    }

    changeFontSize(scopeInfo){
        const fontScope = this.state.fontScope;

        if(scopeInfo == "firstScope" && fontScope != "firstScope")
            this.setState({currentFontSize: this.defFontSize / 2, fontScope: "firstScope"});
        else if(scopeInfo == "secondScope" && fontScope != "secondScope")
            this.setState({currentFontSize: this.defFontSize / 3, fontScope: "secondScope"});
        else if(scopeInfo == "none")
            this.setState({currentFontSize: this.defFontSize, fontScope: "none"});
    }

    
    handleChange(event){
        if(this.state.currentValueRight == "none")
            this.setState({currentLine: event.target.value ,currentValue: Number(event.target.value)});
        else
            this.setState({currentLine: event.target.value ,currentValueRight: Number(event.target.value)});

        if(event.target.value.length >= 7 && event.target.value.length < 14)
            this.changeFontSize("firstScope");
        else if(event.target.value.length >= 14)
            this.changeFontSize("secondScope");
        else
            this.changeFontSize("none");
    }

    onNumberButtonClick(buttonValue){
        let currentLine = this.state.currentLine;
        if(buttonValue != "clear"){
            this.setState({clickCounter: this.state.clickCounter + 1});
            console.log(this.state.clickCounter);
            if(this.state.clickCounter > 10)
                this.audio = <AudioDarkSide/>
            document.getElementById(buttonValue).play();
        }
        if (buttonValue == "clear"){
            this.setState({currentValue: 0, currentLine: "0", currentValueRight: "none"});
            this.changeFontSize("none");
        }
        else if(this.state.currentValueRight == "none"){
            if(this.state.currentLine == "0")
                this.setState({currentValue: Number(buttonValue), currentLine: buttonValue});
            else
                this.setState({currentValue: Number(currentLine + buttonValue), currentLine : currentLine + buttonValue});
        } 
        else{
            if(this.state.currentOperation != "none" && this.state.currentValueRight == "0")
                this.setState({currentValueRight: Number(buttonValue), currentLine: buttonValue});
            else
                this.setState({currentValueRight: Number(currentLine + buttonValue), currentLine : currentLine + buttonValue});
        }
       if(currentLine.length >= 7 && currentLine.length < 14)
            this.changeFontSize("firstScope");
        else if(currentLine.length >= 14)
            this.changeFontSize("secondScope");
        else
            this.changeFontSize("none");
    }

    onOperationButtonClick(buttonValue){
        const currentValue = this.state.currentValue;
        const currentValueRight = this.state.currentValueRight;
        if(buttonValue == "+/-")
        {
            if(currentValueRight == "none")
                this.setState({currentValue: currentValue * -1, currentLine: currentValue * -1});
            else
                this.setState({currentValueRight : currentValueRight * -1, currentLine: currentValueRight * -1});
        }
        else
            this.setState({currentValueRight: 0,currentOperation: buttonValue});
    }

    calculate(){
        const currentValue = this.state.currentValue;
        const currentValueRight = this.state.currentValueRight;
        const currentOperation = this.state.currentOperation;
        let final_value = 0;

        switch(currentOperation){
            case "+" : final_value = currentValue + currentValueRight; break;
            case "-" : final_value = currentValue - currentValueRight; break;
            case "*" : final_value = currentValue * currentValueRight; break;
            case "/" : final_value = currentValue / currentValueRight; break;
            case "%" : final_value = currentValue * (currentValueRight / 100); break;
        }
        this.setState({currentValue: final_value, currentLine: final_value});

        final_value = String(final_value);
        if(final_value.length >= 7 && final_value.length < 14)
            this.changeFontSize("firstScope");
        else if(final_value.length >= 14)
            this.changeFontSize("secondScope");
        else
            this.changeFontSize("none");

        console.log(String(final_value).length);
    }
    
    render() {
        return (
             <div>
                 {this.audio}
                 <input type="text" name="" id="" onChange = {this.handleChange} value = {this.state.currentLine} className = "output" style = {{fontSize: this.state.currentFontSize}} maxLength = "20"/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"clear")} inner = "C"  className = {"operationButtonTop"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"+/-")} inner = "+/-" className = {"operationButtonTop"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"%")} inner = "%" className = {"operationButtonTop"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"/")} inner = "/" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"7")} inner = "7" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"8")} inner = "8" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"9")} inner = "9" className = {"numberButton"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"*")} inner = "x" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"4")} inner = "4" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"5")} inner = "5" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"6")} inner = "6" className = {"numberButton"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"-")} inner = "-" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"1")} inner = "1" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"2")} inner = "2" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"3")} inner = "3" className = {"numberButton"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"+")} inner = "+" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"0")} inner = "0" className = {"numberButton zero"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,".")} inner = "." className = {"numberButton"}/>
                 <CButton onClick = {this.calculate} inner = "=" className = {"operationButton"}/>
             </div>
        );
    }

}


ReactDOM.render(
    <Calculator/>,document.getElementById("root")
)