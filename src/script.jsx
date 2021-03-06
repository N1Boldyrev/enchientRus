//kek

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
                 <audio src="audio/10.mp3" id = "10"></audio>
                 <audio src="audio/11.mp3" id = "11"></audio>
                 <audio src="audio/12.mp3" id = "12"></audio>
                 <audio src="audio/13.mp3" id = "13"></audio>
                 <audio src="audio/14.mp3" id = "14"></audio>
                 <audio src="audio/15.mp3" id = "15"></audio>
                 <audio src="audio/16.mp3" id = "16"></audio>
                 <audio src="audio/17.mp3" id = "17"></audio>
                 <audio src="audio/18.mp3" id = "18"></audio>
                 <audio src="audio/19.mp3" id = "19"></audio>
        </div>
    );
}


const CButton = (props) => <button onClick = {props.onClick} id = {props.id} className = {props.className}>{props.inner}</button>;

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.defFontSize = 60;
        this.state = {
        currentLine: "0", //Значение в поле ввода
        currentValue: 0,  //Левый операнд
        currentOperation: "none", //Выбранная операция 
        currentValueRight: "none", // Правый операнд
        currentFontSize : this.defFontSize, //Размер выводимого шрифта
        fontScope: "none", // Состояние выводимого шрифта
        clickCounter: 0, //Счетчик нажатия на кнопки
        activeOperation: "none", //Выбранная операция для смены цвета кнопки
        natural_numbers_mode : false, //Режим работы с натуральными числами
    };
        this.handleChange = this.handleChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.onDotСlick = this.onDotСlick.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    componentDidMount(){
        document.addEventListener("keydown",this.onKeyPressed);
    }

    onKeyPressed(event){
        const numbers = ["0","1","2","3","4","5","6","7","8","9"];
        const operations = ["+","-","/","*","%","+/-"];
        const strEvent = String(event.key);
        for(let i = 0; i < numbers.length; i++){
            if(event.key == numbers[i]){
                this.onNumberButtonClick(strEvent);
                return;
            }
        }
        for(let i = 0; i < operations.length; i++)
            if(event.key == operations[i]){
                this.onOperationButtonClick(strEvent,strEvent);
                return;
            }
        if(event.key == "=" || event.key == "Enter"){
            this.calculate();
        }
        if(event.key == "." || event.code == "NumpadDecimal")
            this.onDotСlick();
        if(event.key == "Backspace" || event.key =="Escape" || event.key == "Delete")
            this.onNumberButtonClick("clear");
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

    onDotСlick(){
        let r_val = false;
        if(this.state.currentValueRight != "none")
            r_val = true;
        if(this.state.natural_numbers_mode != true || r_val == true)
        {
            this.setState({
                natural_numbers_mode: true,
                currentLine: this.state.currentLine + "."
            });
            if(this.state.currentValueRight != "none")
                this.setState({currentValueRight: this.currentValueRight + "."});
            else
                this.setState({currentValue: this.currentValue + "."});
        }
    }

    onNumberButtonClick(buttonValue){
        let currentLine = this.state.currentLine;
        if(buttonValue != "clear" && buttonValue != "."){                  
            this.setState({clickCounter: this.state.clickCounter + 1});
            if(this.state.clickCounter > 10)
                document.getElementById(Number(buttonValue) + 10).play();
            else
                document.getElementById(buttonValue).play();
        }
        if (buttonValue == "clear"){
            this.setState({currentValue: 0, currentLine: "0", currentValueRight: "none", natural_numbers_mode: false});
            this.changeFontSize("none");
            this.changeOperationButtonColor("none");
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

    changeOperationButtonColor(buttonId){
        const activeOperation = this.state.activeOperation;
        if(buttonId == "none" && activeOperation != "none"){ //Если пользователь очищает поле     
            document.getElementById(activeOperation).className = "operationButton";
            this.setState({activeOperation: "none"});
        }
        else if(buttonId != "none" && activeOperation != "none"){ //Если одна активная операция заменяется другой
            document.getElementById(activeOperation).className = "operationButton";
            document.getElementById(buttonId).className = "operationButton_active";
            this.setState({activeOperation: buttonId});
        }
        else if(buttonId != "none" && activeOperation == "none"){ //Если нет активной операции
            document.getElementById(buttonId).className = "operationButton_active"
            this.setState({activeOperation: buttonId});
        }
    }

    onOperationButtonClick(buttonValue, buttonId){
        this.changeOperationButtonColor(buttonId);
        const currentValue = this.state.currentValue;
        const currentValueRight = this.state.currentValueRight;
        const currentLine = this.state.currentLine;
        if(buttonValue == "+/-"){
            if(currentValue == currentLine)
                this.setState({currentValue: currentValue * -1, currentLine: currentValue * -1});
            else
                this.setState({currentValueRight: currentValueRight * -1, currentLine: currentValueRight * -1});
        }
        else
        this.setState({currentValueRight: 0,currentOperation: buttonValue});
    }

    calculate(){
        const currentValue = this.state.currentValue;
        const currentValueRight = this.state.currentValueRight;
        const currentOperation = this.state.currentOperation;
        let final_value = 0;
        this.changeOperationButtonColor("none");
        if(currentValue == 0 || currentValueRight == "none" || currentOperation == "none")
            this.setState({currentLine: currentValue});

        else{
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
        }
    }
    
    render() {
        return (
             <div>
                 <Audio/>
                 <input type="text" name="" id="" onChange = {this.handleChange} value = {this.state.currentLine} className = "output" style = {{fontSize: this.state.currentFontSize}} maxLength = "20"/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"clear")} inner = "C" className = {"operationButtonTop"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"+/-","none")} inner = "+/-" className = {"operationButtonTop"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"%","none")} inner = "%" className = {"operationButtonTop"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"/","/")} inner = "/" id = "/" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"7")} inner = "7" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"8")} inner = "8" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"9")} inner = "9" className = {"numberButton"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"*", "*")} inner = "x" id = "*" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"4")} inner = "4" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"5")} inner = "5" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"6")} inner = "6" className = {"numberButton"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"-","-")} inner = "-" id = "-" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"1")} inner = "1" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"2")} inner = "2" className = {"numberButton"}/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"3")} inner = "3" className = {"numberButton"}/>
                 <CButton onClick = {this.onOperationButtonClick.bind(this,"+","+")} inner = "+" id = "+" className = {"operationButton"}/>
                 <br/>
                 <CButton onClick = {this.onNumberButtonClick.bind(this,"0")} inner = "0" className = {"numberButton zero"}/>
                 <CButton onClick = {this.onDotСlick} inner = "." className = {"numberButton"}/>
                 <CButton onClick = {this.calculate} inner = "=" className = {"operationButton"}/>
             </div>
        );
    }

}
ReactDOM.render(
    <Calculator/>
    ,document.getElementById("root")
)