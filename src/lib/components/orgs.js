import React from 'react'
import Component from 'hyper/component'

import { OrgIcon } from './svg-icon';
import Selector from './selector';
import { terminal } from '../../index';

import * as Config from '../utils/config';
import * as IBMCloud from '../utils/ibmcloud';

export default class Orgs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orgName: '',
      orgs: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    Config.addListener(this);

    this.init();
  }

  async init() {
    if (Config.isLoggedIn() && Config.settings().cfTarget) {
      const { orgName } = Config.settings();

      // it's possible the org is not yet targeted and must have an empty org
      let orgs = [{name: ''}];

      try {
        const o = await IBMCloud.orgs();
        orgs = [...orgs, ...o];
      } catch (e) { }

      this.setState({
        orgName,
        orgs
      });
    }
  }

  handleClick() {
    this.init()
  }

  handleChange(event) {
    const orgName = event.target.value;

    terminal(`target -o ${orgName}`);
    
    this.setState({ orgName });
  }

  render() {
    return (
      <div className="item">
        <OrgIcon onClick={this.handleClick} />
        <Selector items={this.state.orgs} name="name" value="name" selected={this.state.orgName} onChange={this.handleChange} />
        <style jsx>{`
        .item {
          margin-left: 10px;
        }
        `}</style>
      </div>
    )
  }

}