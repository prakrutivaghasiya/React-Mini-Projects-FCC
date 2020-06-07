import React, { Component } from 'react'

export class Buttons extends Component {
    render() {
        return (
            <div id='buttons'>
                <div className='number-container'>
                    <button id='clear'
                        className='red span-h'
                        onClick={this.props.clear}> AC </button>
                    <button id='delete'
                        className='dark-grey'
                        onClick={this.props.delete}> C </button>

                    {this.props.nums.map((num) => (
                        <button
                            key={num.id}
                            id={num.id}
                            className={`light-grey ${num.value === '0' && `span-h`}`} onClick={this.props.handleClick}>{num.value}</button>
                    ))}

                    <button id='decimal'
                        className='light-grey'
                        onClick={this.props.handleClick}> . </button>
                </div>
                <div className='operator-container'>

                    {this.props.ops.map((op) => (
                        <button
                            key={op.id}
                            id={op.id}
                            className={'dark-grey'} onClick={this.props.handleClick}>{op.value}</button>
                    ))}

                    <button id='equals'
                        className='dark-grey blue'
                        onClick={this.props.handleEvaluate}> = </button>
                </div>
            </div>
        )
    }
}

export default Buttons
