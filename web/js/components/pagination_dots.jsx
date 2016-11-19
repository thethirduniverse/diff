import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'

const PaginationDots = React.createClass({
  propTypes: {
    totalDots: React.PropTypes.number.isRequired,
    currentIndex: React.PropTypes.number.isRequired,
    leftChevronClicked: React.PropTypes.func.isRequired,
    rightChevronClicked: React.PropTypes.func.isRequired,

    showExpandMore: React.PropTypes.bool
  },

  _height: 24,
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
      <div style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', margin: 'auto'}}>
          <IconButton onClick={this.props.leftChevronClicked}>
            <ChevronLeft />
          </IconButton>
          <svg width={this._getWidth()} height={this._height} >
            {
              this._dotPositions().map((pos, idx) => (
                <circle key={idx} cx={pos.x} cy={pos.y} r={this._radius} fill={idx === this.props.currentIndex ? highlight : disabled} />
              ))
            }
          </svg>
          <IconButton onClick={this.props.rightChevronClicked}>
            <ChevronRight />
          </IconButton>
        </div>
        {
          this.props.showExpandMore
            ? (<div style={{margin: 'auto'}}>
              <IconButton>
                <ExpandMore />
              </IconButton>
            </div>)
            : null
        }
      </div>
    )
  }
})

export default muiThemeable()(PaginationDots)
