import assert from 'assert'
import { showPreviousReply, showNextReply, collapseReplies, expandReplies, mergePostPlaceholders, mergeLoadedPosts, mergeRawPosts } from 'reducers/post_show_reducer.js'

describe('PostShowReducer', function() {
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

  describe('append reply ids', function() {
    it('should behave properly for expanded reply', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21}, {id: 22}],
            [{id: 31, _loaded: false}, {id: 32, _loaded: false}, {id: 33, _loaded: false}]
          ],
          replyIndexes: [0, 0, 0]
        },
        mergePostPlaceholders(
          {
            replyTree: [
              [{id: 11}, {id: 12}],
              [{id: 21}, {id: 22}]
            ],
            replyIndexes: [0, 0]
          },
          21,
          [31, 32, 33]
        )
      )
    })
  })

  describe('append loaded post', function() {
    it('should be able to find the post and update it', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21}, {id: 22}],
            [{id: 31, _loaded: false}, {id: 32, content: 'some content', _loaded: true}, {id: 33, _loaded: false}]
          ],
          replyIndexes: [0, 0, 0]
        },
        mergeLoadedPosts(
          {
            replyTree: [
              [{id: 11}, {id: 12}],
              [{id: 21}, {id: 22}],
              [{id: 31, _loaded: false}, {id: 32, _loaded: false}, {id: 33, _loaded: false}]
            ],
            replyIndexes: [0, 0, 0]
          },
          21,
          [{
            id: 32,
            content: 'some content'
          }]
        )
      )
    })
  })

  describe('merge raw posts', function() {
    it('should not allow a loaded post to become not loaded', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21}, {id: 22}],
            [{id: 31, _loaded: false}, {id: 32, content: 'some content', _loaded: true}, {id: 33, _loaded: false}]
          ],
          replyIndexes: [0, 0, 0]
        },
        mergeRawPosts(
          {
            replyTree: [
              [{id: 11}, {id: 12}],
              [{id: 21}, {id: 22}],
              [{id: 31, _loaded: false}, {id: 32, content: 'some content', _loaded: true}, {id: 33, _loaded: false}]
            ],
            replyIndexes: [0, 0, 0]
          },
          21,
          [{
            id: 32,
            _loaded: false
          }]
        )
      )
    })

    it('allows update to a loaded post', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21}, {id: 22}],
            [{id: 31, _loaded: false}, {id: 32, content: 'some other content', _loaded: true}, {id: 33, _loaded: false}]
          ],
          replyIndexes: [0, 0, 0]
        },
        mergeRawPosts(
          {
            replyTree: [
              [{id: 11}, {id: 12}],
              [{id: 21}, {id: 22}],
              [{id: 31, _loaded: false}, {id: 32, content: 'some content', _loaded: true}, {id: 33, _loaded: false}]
            ],
            replyIndexes: [0, 0, 0]
          },
          21,
          [{
            id: 32,
            content: 'some other content',
            _loaded: true
          }]
        )
      )
    })

    it('allows update to an unloaded post', function() {
      assert.deepEqual(
        {
          replyTree: [
            [{id: 11}, {id: 12}],
            [{id: 21}, {id: 22}],
            [{id: 31, _loaded: false}, {id: 32, _attr: 2, _loaded: false}, {id: 33, _loaded: false}]
          ],
          replyIndexes: [0, 0, 0]
        },
        mergeRawPosts(
          {
            replyTree: [
              [{id: 11}, {id: 12}],
              [{id: 21}, {id: 22}],
              [{id: 31, _loaded: false}, {id: 32, _attr: 1, _loaded: false}, {id: 33, _loaded: false}]
            ],
            replyIndexes: [0, 0, 0]
          },
          21,
          [{
            id: 32,
            _attr: 2,
            _loaded: false
          }]
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
