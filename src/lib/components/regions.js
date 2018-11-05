import React from 'react'
import Component from 'hyper/component'

import { RegionIcon } from './svg-icon';
import Selector from './selector';
import { terminal } from '../../index';

import * as Config from '../utils/config';
import * as IBMCloud from '../utils/ibmcloud';

export default class Regions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      regionName: '',
      regions: []
    };

    this.init();

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async init() {
    const { regionName } = Config.settings();
    const regions = await IBMCloud.regions();

    this.setState({
      regionName,
      regions
    });
  }

  handleClick() {
    this.handleCommand(this.state.regionName);
  }

  handleChange(event) {
    this.handleCommand(event.target.value);
  }

  handleCommand(regionName) {
    const subdomain = this.toSubdomain(regionName);

    let cmd = '';
    
    // implies the config.json has an active login so target else login
    if (Config.isLoggedIn()) {
      cmd = `target -r ${regionName}`;
    } else {
      cmd = `login -a api.${subdomain}.bluemix.net`;

      if (this.props.sso) {
        cmd += ' --sso';
      }
    }

    terminal(cmd);
    
    this.setState({ regionName });

    Config.notifyListeners();
  }

  render() {
    return (
      <div className="item">
        <RegionIcon onClick={this.handleClick} />
        <Selector items={this.state.regions} name="name" value="name" selected={this.state.regionName} onChange={this.handleChange} />
        <style jsx>{`
        .item {
          margin-left: 10px;
        }
        `}</style>
      </div>
    )
  }

  toSubdomain(region) {
    switch (region) {
      case 'us-south':
        return 'ng';
      case 'us-east':
        return 'us-east';
      case 'eu-gb':
        return 'eu-gb';
      case 'eu-de':
        return 'eu-de';
      case 'au-syd':
        return 'au-syd';
      case 'jp-tok':
        return 'au-syd';
      default:
        return 'ng';
    }
  }
}