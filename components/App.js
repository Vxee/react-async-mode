import React from 'react';
import ReactDOM from 'react-dom';
import {hot} from 'react-hot-loader/root';

import Tab from './Tab';
import Input from './Input';
import Items from './Items';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsync: true,
      text: '',
      items: [...new Array(5000)].map((_, i) => ({index: i, name: `item: ${i}`, value: i}))
    };
  }

  syncUpdate(fn, cb) {
    ReactDOM.flushSync(() => {
      this.setState(fn, cb);
    });
  }

  tick() {
    this.setState(
      state => ({
        count: state.count + 1,
        items: state.items.map(item => Object.assign({}, item, {name: `item:${item.value + 1}`, value: item.value + 1}))
      }),
      () => {
        this.timerId = setTimeout(() => {
          this.state.isAsync ? this.tick() : ReactDOM.flushSync(() => this.tick());
        }, 100);
      }
    );
  }

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    if(this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  render() {
    const {isAsync, text, items} = this.state;
    return (
      <div>
        <Tab isAsync={isAsync} onClick={value => this.syncUpdate(() => ({isAsync: value, text: ''}))} />
        <h3>Rendering a text input as sync priority</h3>
        <Input value={text} onChange={value => this.syncUpdate(() => ({text: value}))} />
        <h3>Rendering {items.length}items as {isAsync ? 'low' : 'sync'} priority</h3>
        <Items items={items} />
      </div>
    );
  }
}

export default hot(App);