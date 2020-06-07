import React, { Component } from 'react'

export class Output extends Component {
    render() {
        return (
            <div id='output'>
                <div id='formula'>{this.props.formula.replace(/\*/g, '×')}</div>
                <div id='display'>{this.props.currentNumber}</div>
            </div>
        )
    }
}

export default Output
