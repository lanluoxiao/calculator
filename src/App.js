import React, {Component, Fragment} from 'react';
import isUnique from './Library.js'

function App() {
  return (
    <Fragment>
      <Input>
      </Input>
      <Output>
      </Output>
    </Fragment>
  );
}

class Codeword extends Component {

}

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      1: 1
    }
  }
}

function Output(props) {
  const {rawLanguage, alphabet} = props;
  const unique = isUnique(rawLanguage, alphabet);
  if (unique) return <p>是唯一码</p>;
  else return <p>不是唯一码</p>;
}

export default App;
