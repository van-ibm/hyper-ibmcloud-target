import React from 'react'
import Component from 'hyper/component'

export default class SelectorsComponent extends Component {

 

  render() {
    console.log(JSON.stringify(this.props));

    return (
      <select value={this.props.selected} onChange={this.props.onChange}>
        {this.props.items.map(item => <option value={item[this.props.value]}>{item[this.props.name]}</option>)}
        <style jsx>{`
          select {
            color: white;
            border: 0px;
            font: bold 14px Menlo;
            background-color: rgba(0, 0, 0, 0.08);
          }
        `}</style>
      </select>

    )
  }
}
