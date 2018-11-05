import React from 'react'
import Component from 'hyper/component'

import { SpaceIcon } from './svg-icon';
import Selector from './selector';
import { terminal } from '../../index';

import * as Config from '../utils/config';
import * as IBMCloud from '../utils/ibmcloud';

export default class Spaces extends Component {

  constructor(props) {
    super(props);

    this.state = {
      spaceName: '',
      spaces: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    Config.addListener(this);

    this.init();
  }

  async init() {
    if (Config.isLoggedIn() && Config.settings().cfTarget) {

      const { spaceName } = Config.settings();

      // it's possible the space is not yet targeted and must have an empty space
      let spaces = [{name: ''}];

      try {
        const s = await IBMCloud.spaces();
        spaces = [...spaces, ...s];
      } catch (e) { }

      this.setState({
        spaceName,
        spaces
      });
    }
  }

  handleClick() {
    this.init();
  }

  handleChange(event) {
    const spaceName = event.target.value;

    terminal(`target -s ${spaceName}`);
    
    this.setState({ spaceName });
  }

  render() {
    return (
      <div className="item">
        <SpaceIcon onClick={this.handleClick} />
        <Selector items={this.state.spaces} name="name" value="name" selected={this.state.spaceName} onChange={this.handleChange} />
        <style jsx>{`
        .item {
          margin-left: 10px;
        }
        `}</style>
      </div>
    )
  }

}