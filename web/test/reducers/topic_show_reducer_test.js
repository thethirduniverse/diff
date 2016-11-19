import assert from 'assert'
import { showPreviousReply, showNextReply, appendReplies } from 'reducers/topic_show_reducer.js'

describe('TopicShowReducer', function() {
  describe('showPreviousReply', function() {
    it('should throw error when internal inconsistency', function() {
      assert.throws(function() {
        showPreviousReply({
          topic: {},
          replyTree: [[], [], []],
          replyIndexes: [1, 2]
        }, {})
      }, Error, /Internal.*/)
    })

    it('should throw error when level out of rance', function() {
      assert.throws(function() {
        showPreviousReply({
          topic: {},
          replyTree: [[], [], []],
          replyIndexes: [1, 2]
        }, {level: 9})
      }, Error, /level.*/)
    })

    it('should properly handle showPreviousReply', function() {
      assert.deepEqual({
        topic: {},
        replyTree: [[0,0], [1], [2,2,2]],
        replyIndexes: [0,0,0]
      },
        showPreviousReply(
          {
            topic: {},
            replyTree: [[0,0], [1], [2,2,2]],
            replyIndexes: [0,0,1]
          },
          {
            level: 2
          }
        ))

      assert.deepEqual({
        topic: {},
        replyTree: [[0,0], [1], [2,2,2]],
        replyIndexes: [0,0,2]
      },
        showPreviousReply(
          {
            topic: {},
            replyTree: [[0,0], [1], [2,2,2]],
            replyIndexes: [0,0,0]
          },
          {
            level: 2
          }
        ))
    })

    it('should trim further levels', function() {
      assert.deepEqual({
        topic: {},
        replyTree: [[0,0], [1], [2,2,2]],
        replyIndexes: [0,0,0]
      },
        showPreviousReply(
          {
            topic: {},
            replyTree: [[0,0], [1], [2,2,2], [3,3,3], [4,4,4]],
            replyIndexes: [0,0,1,0,0]
          },
          {
            level: 2
          }
        ))
    })
  })

  describe('showNextReply', function() {
    it('should throw error when internal inconsistency', function() {
      assert.throws(function() {
        showNextReply({
          topic: {},
          replyTree: [[], [], []],
          replyIndexes: [1, 2]
        }, {})
      }, Error, /Internal.*/)
    })

    it('should throw error when level out of rance', function() {
      assert.throws(function() {
        showNextReply({
          topic: {},
          replyTree: [[], [], []],
          replyIndexes: [1, 2]
        }, {level: 9})
      }, Error, /level.*/)
    })

    it('should properly handle showPreviousReply', function() {
      assert.deepEqual({
        topic: {},
        replyTree: [[0,0], [1], [2,2,2]],
        replyIndexes: [0,0,2]
      },
        showNextReply(
          {
            topic: {},
            replyTree: [[0,0], [1], [2,2,2]],
            replyIndexes: [0,0,1]
          },
          {
            level: 2
          }
        ))

      assert.deepEqual({
        topic: {},
        replyTree: [[0,0], [1], [2,2,2]],
        replyIndexes: [0,0,0]
      },
        showNextReply(
          {
            topic: {},
            replyTree: [[0,0], [1], [2,2,2]],
            replyIndexes: [0,0,2]
          },
          {
            level: 2
          }
        ))
    })

    it('should trim further levels', function() {
      assert.deepEqual({
        topic: {},
        replyTree: [[0,0], [1], [2,2,2]],
        replyIndexes: [0,0,2]
      },
        showNextReply(
          {
            topic: {},
            replyTree: [[0,0], [1], [2,2,2], [3,3,3], [4,4,4]],
            replyIndexes: [0,0,1,0,0]
          },
          {
            level: 2
          }
        ))
    })
  })

  describe('append replies', function() {
    it('should behave properly', function() {
      assert.deepEqual(
        {
          topic: {},
          replyTree: [[],[],[],[1,2,3]],
          replyIndexes: [1,2,3,0]
        },
        appendReplies(
          {
            topic: {},
            replyTree: [[], [], []],
            replyIndexes: [1, 2, 3]
          },
          {
            replies: [1,2,3]
          }
        )
      )
    })
  })
})
