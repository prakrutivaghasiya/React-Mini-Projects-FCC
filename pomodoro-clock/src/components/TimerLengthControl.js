import React, { Component } from 'react'

export class TimerLengthControl extends Component {
    render() {
        return (
            <div className='flex'>
                <div className='title'>{this.props.title}</div>
                <div className='buttons'>
                    <button value='-'
                        onClick={this.props.handleIncrDecr}>
                        <i className='fa fa-arrow-down'></i>
                    </button>
                    <span>{this.props.count}</span>
                    <button value='+'
                        onClick={this.props.handleIncrDecr}>
                        <i className='fa fa-arrow-up'></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default TimerLengthControl
