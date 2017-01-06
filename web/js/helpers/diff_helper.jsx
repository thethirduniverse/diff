import React from 'react'
import { diffChars } from 'diff'

import styles from '~/styles'

const addedStyle = {
  color: 'green'
}

const removedStyle = {
  color: 'red',
  textDecoration: 'line-through'
}

const showLineBreaks = (text) => {
  // 0x21b2 is arrow
  return text.replace('\n', '\n' + String.fromCharCode('0x21b2'))
}

const hideLingBreaks = (text) => {
  return text.replace('\n', String.fromCharCode('0x21b2'))
}

export const visualizeChange = (oldContent, newContent) => {
  const diff = diffChars(oldContent, newContent)
  var i = 0
  return <p style={styles.textBlock}>
    {
      diff.map(function(part) {
        i++
        if (part.added) {
          return <span style={addedStyle} key={i}>{showLineBreaks(part.value)}</span>
        }
        if (part.removed) {
          return <span style={removedStyle} key={i}>{hideLingBreaks(part.value)}</span>
        }
        return <span key={i}>{part.value}</span>
      })
    }
  </p>
}
