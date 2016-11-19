import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AccountController from 'controllers/account_controller.js'
import AppController from 'controllers/app_controller.js'
import HomeController from 'controllers/home_controller.js'
import ProfileController from 'controllers/profile_controller.js'
import TopicFormCard from 'components/topic_form_card.jsx'
import TopicShowController from 'controllers/topic_show_controller.js'

export default (
  <Route path="/" component={AppController}>
    <IndexRoute component={HomeController} />
    <Route path="sign-in" component={AccountController} />
    <Route path="topics/:id" component={TopicShowController} />
    <Route path="topics" component={TopicFormCard} />
    <Route path="profiles/:id" component={ProfileController} />
  </Route>
)
