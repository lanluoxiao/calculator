import React, {Component, Fragment} from 'react';
import isUnique from './Library.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subsets: 2,
      alphabet: ['A', 'B'],
      codewordList: [
        'AU',
        'AUB',
        'AUBB'
      ],
      inputValue: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.inputValue.split('').every(x => this.state.alphabet.includes(x) || x === 'U')) {
      this.setState(
        state => ({
          codewordList: state.codewordList.concat([state.inputValue]),
          inputValue: ''
        })
      );
      event.preventDefault();
    } else {
      alert('不符合要求');
      event.preventDefault();
    }
  }

  handleSelect(event) {
    this.setState({
      subsets: event.target.value,
      alphabet: ['A', 'B', 'C', 'D'].slice(0, event.target.value),
      codewordList: []
    });
  }

  handleDelete(index) {
    let tmpList = [...this.state.codewordList];
    tmpList.splice(index, 1);
    this.setState({codewordList: tmpList});
  }

  render() {
    let codewords = this.state.codewordList.map((codeword, index) => <li key={index}>{codeword}<button onClick={this.handleDelete.bind(this, index)}>×</button></li>)
    return (
      <Fragment>
        <div id="left">
          <h2>输入</h2>
          <p>键盘数量：
            <select value={this.state.subsets} onChange={this.handleSelect}>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </p>
          <p>可用的字母为：{this.state.alphabet.join("、")} 和 U</p>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
          <ul>{codewords}</ul>
        </div>
        <Output alphabet={this.state.alphabet} codewordList={this.state.codewordList}/>
      </Fragment>
    )
  }
}

function Output(props) {
  const {alphabet, codewordList} = props;
  return (
    <div id="right">
      <h2>输出</h2>
      <p>{codewordList.length === 0 ? '' : isUnique(alphabet, codewordList)}</p>
    </div>
  )
}

export default App;
