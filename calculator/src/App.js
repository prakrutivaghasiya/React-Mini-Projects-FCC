import React, { Component } from 'react';
import './App.css';
import Output from './Components/Output';
import Buttons from './Components/Buttons';
import Author from './Components/Author';

const ops = [{ id: 'divide', value: '/' }, { id: 'multiply', value: '×' }, { id: 'subtract', value: '-' }, {id:'add', value:'+'}];

const nums = [{ id: 'seven', value:'7' }, { id: 'eight', value : '8' }, { id: 'nine', value: '9' }, { id: 'four',  value: '4' }, { id: 'five', value: '5' }, { id: 'six', value: '6' }, { id: 'one', value: '1' }, { id: 'two', value: '2'}, { id: 'three', value: '3' }, {id:'zero', value: '0'}];

const operators = /[*+/]/;
const endswithoperator = /[*+‑/]$/;

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      prevNumber : '',
      currentNumber: '0',
      formula: '',
      evaluated: false
    }
  }

  handleClick = (e) => {
    const {currentNumber, prevNumber, formula, evaluated} = this.state;
    const {innerText} = e.target;

    if(!Number.isNaN(Number(innerText))){
      if(evaluated){
        this.setState({
          currentNumber: innerText,
          prevNumber: innerText,
          formula: innerText !== '0' ? innerText : '',
          evaluated: false
        })
      } else {
        if (currentNumber === '0') {
          this.setState({
            currentNumber: innerText,
            prevNumber: innerText,
            formula: innerText,
            evaluated: false
          });
        } else {
          this.setState({
            currentNumber: currentNumber + innerText,
            prevNumber: prevNumber + innerText,
            formula: formula + innerText,
            evaluated: false
          })
        }
      }
    }

    switch(innerText){

      case '.':
        if (evaluated) {
          this.setState({
            currentNumber: innerText,
            prevNumber: innerText,
            formula: innerText !== '0' ? innerText : '',
            evaluated: false
          })
        } else{
          if(!currentNumber.includes('.')){
            this.setState({
              currentNumber: currentNumber + innerText,
              prevNumber: currentNumber,
              formula: formula + innerText,
              evaluated: false
            })
          }
        }
        break;
      
      case '+':
      case '-':
      case '/':
      case '×': 
          if(! operators.test(formula[formula.length - 1])){
            if(evaluated){
              this.setState({
                formula: prevNumber + innerText.replace(/×/g, '*'),
                currentNumber: innerText,
                prevNumber: prevNumber + innerText,
                evaluated: false
              })
            } else{
              this.setState({
                formula: formula + innerText.replace(/×/g, '*'),
                currentNumber: innerText,
                prevNumber: prevNumber + innerText,
                evaluated: false
              })
            }
          } else{
            this.setState({
              formula: formula.slice(0,-1) + innerText.replace(/×/g, '*'),
              currentNumber: innerText,
              prevNumber: prevNumber.slice(0,-1) + innerText,
              evaluated: false
            })
          }
          break;
      default: break; 
    }
  }

  handleEvaluate = () => {
    const { currentNumber, formula } = this.state;
    
    let exp = formula;
    if (endswithoperator.test(formula)){
      exp = exp.slice(0, -1);
      console.log(exp, currentNumber);
    }
    
    let answer = (Math.round(1000000 * eval(exp)) / 1000000).toString();

    this.setState({
      currentNumber: answer,
      formula: formula + '=' + answer,
      prevNumber: answer,
      evaluated: true
    });
  }

  delete = () => {
    const { currentNumber, prevNumber, formula, evaluated } = this.state;

    if (formula.length === 1) {
      this.initialize();
    }else {
      if(evaluated){
        this.initialize();
      }else{
        this.setState({
          currentNumber: currentNumber === '' ? formula[formula.length - 1] : currentNumber.slice(0,-1),
          prevNumber: prevNumber.slice(0, -1),
          formula: formula.slice(0, -1)
        });
      }
    }
  }

  clear = () => {
    this.initialize();
  }

  initialize = () => {
    this.setState({
      currentNumber: '0',
      prevNumber: '',
      formula: '',
      evaluated: 'false'
    });
  }

  render() {
    const {currentNumber, formula} = this.state;
    return (
      <div className='container'>
        <div id='calculator'>
          <Output 
            currentNumber={currentNumber}
            formula={formula}></Output>
          <Buttons 
            nums={nums}
            ops={ops}
            handleClick={this.handleClick}
            handleEvaluate={this.handleEvaluate}
            clear={this.clear}
            delete={this.delete}></Buttons>
        </div>
        <Author />
      </div>
    )
  }
}

export default App
