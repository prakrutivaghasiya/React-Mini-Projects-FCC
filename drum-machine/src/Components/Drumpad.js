import React, { Component } from 'react'

export class Drumpad extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeydown);
        window.focus();
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown = e => {
        if (e.keyCode === this.props.letter.charCodeAt()) {
            this.handleClick();
        }  
    }

    handleClick = () => {
        if(this.props.power) {
            this.audio.play();
            this.audio.currentTime = 0;
            this.props.handleDisplay(this.props.id);
        }  
    }
    render() {
        return (
            <div className='drum-pad' id={this.props.id}
                onClick = {this.handleClick}>
                <audio 
                    id={this.props.letter}
                    className='clip'
                    ref={ref=> this.audio = ref}
                    src={this.props.src}
                ></audio>
                <h3>{this.props.letter}</h3>
            </div>
        )
    }
}

export default Drumpad
