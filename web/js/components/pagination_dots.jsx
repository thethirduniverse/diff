import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const PaginationDots = React.createClass({
  propTypes: {
    totalDots: React.PropTypes.number.isRequired,
    currentIndex: React.PropTypes.number.isRequired
  },

  _height: 40,
  _radius: 5,
  _padding: 5,

  _dotPositions: function() {
    const num = this.props.totalDots
    var startX = this._radius
    const centerY = this._height / 2
    const positions = []
    for (var i = 0; i < num; i++) {
      positions.push({x: startX, y: centerY})
      startX += this._radius * 2 + this._padding
    }
    return positions
  },

  _getWidth: function() {
    return this.props.totalDots * this._radius * 2 + (this.props.totalDots - 1) * this._padding
  },

  render: function() {
    /* eslint-disable react/prop-types */
    const disabled = this.props.muiTheme.palette.disabledColor
    const highlight = this.props.muiTheme.palette.primary1Color
    /* eslint-enable react/prop-types */

    return (
      <div>
        <svg style={{display: 'block', margin: 'auto'}} width={this._getWidth()} height={this._height}>
          {
            this._dotPositions().map((pos, idx) => (
              <circle key={idx} cx={pos.x} cy={pos.y} r={this._radius} fill={idx === this.props.currentIndex ? highlight : disabled} />
            ))
          }
        </svg>
      </div>
    )
  }
})

export default muiThemeable()(PaginationDots)
