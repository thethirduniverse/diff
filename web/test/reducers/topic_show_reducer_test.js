import assert from 'assert'
import { showPreviousReply, showNextReply, appendReplies, collapseReplies, expandReplies } from 'reducers/topic_show_reducer.js'

describe('TopicShowReducer', function() {
  describe('showPreviousReply', function() {
    it('should throw error when internal inconsistency', function() {
      assert.throws(function() {
        showPreviousReply({
          topic: {},
          replyTree: [[], [], []],
          replyIndexes: [1, 2]
        }, 0)
      }, Error, /Internal.*/)
    })

    it('should throw error when level out of rance', function() {
      assert.throws(function() {
        showPreviousReply({
          topic: {},
          replyTree: [[], [], []],
          replyIndexes: [1, 2]
        }, 9)
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
          }, 2
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
          }, 2
        ))
    })
  })

  describe('showNextReply', function() {
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
          }, 2
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
          }, 2
        ))
    })
  })

  describe('append replies', function() {
    it('should behave properly for root level', function() {
      assert.deepEqual(
        {
          replyTree: [[1, 2, 3]],
          replyIndexes: [0]
        },
        appendReplies(
          {
            replyTree: [],
            replyIndexes: []
          },
          null,
          [1, 2, 3]
        )
      )
    })

    it('should behave properly for expanded reply', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21}, {id: 22}],
            [{id: 31}, {id: 32}, {id: 33}]
          ],
          replyIndexes: [0, 0, 0]
        },
        appendReplies(
          {
            replyTree: [
              [{id: 11}, {id: 12}],
              [{id: 21}, {id: 22}]
            ],
            replyIndexes: [0, 1]
          },
          21,
          [{id: 31}, {id: 32}, {id: 33}]
        )
      )
    })
  })

  describe('collapse replies', function() {
    it('collaps correctly for level 0', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{
              id: 11,
              replies: [
                {id: 21},
                {
                  id: 22,
                  replies: [
                    {id: 31},
                    {id: 32},
                    {id: 33}
                  ]
                },
              ]
            }, {id: 12}]
          ],
          replyIndexes: [0]
        },
        collapseReplies(
          {
            replyTree: [
              [ {id: 11}, {id: 12} ],
              [ {id: 21}, {id: 22} ],
              [ {id: 31}, {id: 32}, {id: 33} ]
            ],
            replyIndexes: [0, 1, 2]
          }, 0
        )
      )
    }),
    it('collaps correctly for level 1', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [
              {id: 21},
              {
                id: 22,
                replies: [
                  {id: 31},
                  {id: 32},
                  {id: 33}
                ]
              },
            ]
          ],
          replyIndexes: [0, 1]
        },
        collapseReplies(
          {
            replyTree: [
              [ {id: 11}, {id: 12} ],
              [ {id: 21}, {id: 22} ],
              [ {id: 31}, {id: 32}, {id: 33} ]
            ],
            replyIndexes: [0, 1, 2]
          }, 1
        )
      )
    })
  })

  describe('expand replies', function() {
    it('expand correctly for index 0', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21},
              {id: 22,
                replies: [
                  {id: 31},
                  {id: 32}
                ]
              }]
          ],
          replyIndexes: [1, 0]
        },
        expandReplies(
          {
            replyTree: [
              [
                {id: 11},
                {
                  id: 12,
                  replies: [
                    {id: 21},
                    {
                      id: 22,
                      replies: [
                        {id: 31},
                        {id: 32}
                      ]
                    }
                  ]
                }
              ],
            ],
            replyIndexes: [0]
          }, 1
        )
      )
    })
  })

})
