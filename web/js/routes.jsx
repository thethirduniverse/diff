import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppController from './controllers/app_controller.js'
import HomeController from './controllers/home_controller.js'
import AccountCardController from './controllers/account_card_controller.js'
import TopicShowController from './controllers/topic_show_controller.js'

export default (
  <Route path="/" component={AppController}>
    <IndexRoute component={HomeController} />
    <Route path="sign-in" component={AccountCardController} />
    <Route path="topics/:id" component={TopicShowController} />
  </Route>
)
