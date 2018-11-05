import React from 'react'
import Component from 'hyper/component'

import { AccountIcon } from './svg-icon';
import Selector from './selector';
import { terminal } from '../../index';

import * as Config from '../utils/config';
import * as IBMCloud from '../utils/ibmcloud';

export default class Accounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountGuid: '',
      accounts: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.init();
  }

  async init() {
    if (Config.isLoggedIn()) {

      const { accountGuid } = Config.settings();
      const accounts = await IBMCloud.accounts();

      this.setState({
        accountGuid,
        accounts
      });
    }
  }

  handleClick() {
    this.init();
  }

  handleChange(event) {
    terminal(`target -c ${event.target.value}`);
    this.setState({ accountGuid: event.target.value });
      }

  render() {
    return (
      <div className="item">
        <AccountIcon onClick={this.handleClick} />
        <Selector items={this.state.accounts} name="name" value="guid" selected={this.state.accountGuid} onChange={this.handleChange} />
        <style jsx>{`
        .item {
          margin-left: 10px;
        }
        `}</style>
      </div>
    )
  }
}