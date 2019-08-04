const router = require('express').Router()
const PostModel = require('../model/Post')

// GET posts
router.get('/', async (req, res) => {
  console.log('inside the get all Posts')
  try {
    const posts = await PostModel.find()
    res.json({
      success: true,
      posts: posts,
      message: 'Post fetch successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      posts: [],
      error: err
    })
  }
})

// GET posts
router.get('/site', async (req, res) => {
  try {
    const posts = await PostModel.find({ is_publish: true })
    res.json({
      success: true,
      posts: posts,
      message: 'Post fetch successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      posts: [],
      error: err
    })
  }
})

// save  post
router.post('/', async (req, res) => {
  try {
    const is_post_save = await PostModel.find({ title: req.body.title })
    console.log(is_post_save)
    if (is_post_save.length) {
      res.json({
        success: false,
        posts: [],
        message: 'Post already added'
      })
      return
    }

    const new_post = new PostModel({
      title: req.body.title,
      short_description: req.body.short_description,
      description: req.body.description,
      url_key: req.body.url_key
    })
    saved_post = await new_post.save()
    res.json({
      success: true,
      post: saved_post,
      message: 'Post save successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      posts: [],
      error: err
    })
  }
})
// update posts
router.put('/:id', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.id })

    update_post = await PostModel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          title: req.body.title,
          short_description: req.body.short_description,
          description: req.body.description,
          url_key: req.body.url_key
        }
      },
      {
        new: true
      }
    )
    res.json({
      success: true,
      posts: update_post,
      message: 'updated successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }
})

// GET post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.id })
    res.json({
      success: true,
      posts: post,
      message: 'Post fetch successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }
})

// publish posts
router.put('/:id/publish', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.id })

    update_post = await PostModel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          publish_date: Date.now(),
          is_publish: true
        }
      },
      {
        new: true
      }
    )
    res.json({
      success: true,
      posts: update_post,
      message: 'Publish  successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }
})

// unpublish posts
router.put('/:id/unpublish', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.id })

    update_post = await PostModel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          publish_date: Date.now(),
          is_publish: false
        }
      },
      {
        new: true
      }
    )
    res.json({
      success: true,
      posts: update_post,
      message: 'Publish  successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }
})

// update view count
router.put('/:id/view_count', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.id })

    update_post = await PostModel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          view_count: req.body.view_count
        }
      },
      {
        new: true
      }
    )
    res.json({
      success: true,
      posts: update_post,
      message: 'Count added  successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }
})
// update like count
router.put('/:id/like_count', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.id })

    update_post = await PostModel.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          view_count: req.body.view_count
        }
      },
      {
        new: true
      }
    )
    res.json({
      success: true,
      posts: update_post,
      message: 'Count added  successfully'
    })
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }
})

module.exports = router
