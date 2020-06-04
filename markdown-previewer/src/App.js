import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

marked.setOptions({
  breaks: true
})

const initialState = 
`#### Header4
##### Header5
###### Header6
  
- list item 1
  - list item 11
    -  list item 111

\`\`\`
  let x = 2;
  let y = 5;
  let z = x + y;
\`\`\`

> Block quotes

this is \`inline\` code. 
Link [Google]('https://google.com' "Google here")
Image
![Image here]\(https: //images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg\)

**check out here!**
_italics_
**_Table_**

  |Syntax|Description|
  |:----:|:-----:|
  |Header | Title |
  |Paragraph | Text |
`;

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
       markdown: initialState
    }
  }
  render() {
    this.handleChange = (e) => this.setState({ markdown: e.target.value})
    return (
      <div className='container'>
        <h3 className='m-4 text-center'>React Markdown Previewer</h3>
        <div className='wrapper'>
          <div className='left'>
            <h5 className='text-center'>Edit:</h5>
            <textarea id='editor' value= {this.state.markdown} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className = 'right'>
            <h5 className = 'text-center'> Preview: </h5>
            <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

