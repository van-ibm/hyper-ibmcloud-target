import React from 'react'
import Component from 'hyper/component'

import { GroupIcon } from './svg-icon';
import Selector from './selector';
import { terminal } from '../../index';

import * as Config from '../utils/config';
import * as IBMCloud from '../utils/ibmcloud';

export default class Groups extends Component {

  constructor(props) {
    super(props);

    this.state = {
      resourceGroupName: '',
      groups: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    Config.addListener(this);    
    
    this.init();
  }

  async init() {
    if (Config.isLoggedIn()) {
      const { resourceGroupName } = Config.settings();
      const groups = await IBMCloud.groups();

      this.setState({
        resourceGroupName,
        groups,
      });
    }
  }

  handleClick() {
    this.init();
  }

  handleChange(event) {
    const resourceGroupName = event.target.value;

    terminal(`target -g ${resourceGroupName}`);
    
    this.setState({ resourceGroupName });
  }

  render() {
    return (
      <div className="item">
        <GroupIcon onClick={this.handleClick} />
        <Selector items={this.state.groups} name="name" value="name" selected={this.state.resourceGroupName} onChange={this.handleChange} />
        <style jsx>{`
        .item {
          margin-left: 10px;
        }
        `}</style>
      </div>
    )
  }

}