import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AccountPageController from 'controllers/account_page_controller.js'
import AppController from 'controllers/app_controller.js'
import HomeController from 'controllers/home_controller.js'
import ProfileController from 'controllers/profile_controller.js'
import SignInController from 'controllers/sign_in_controller.js'
import SignUpController from 'controllers/sign_up_controller.js'
import EmailConfirmationController from 'controllers/email_confirmation_controller.js'
import ResetPasswordController from 'controllers/reset_password_controller.js'
import TopicFormCard from 'components/topic_form_card.jsx'
import TopicShowController from 'controllers/topic_show_controller.js'

export default (
  <Route path="/" component={AppController}>
    <IndexRoute component={HomeController} />
    <Route path="account" component={AccountPageController}>
      <Route path="sign-in" component={SignInController} />
      <Route path="sign-up" component={SignUpController} />
      <Route path="email-confirmation" component={EmailConfirmationController} />
      <Route path="reset-password" component={ResetPasswordController} />
    </Route>
    <Route path="topics/:id" component={TopicShowController} />
    <Route path="topics" component={TopicFormCard} />
    <Route path="profiles/:id" component={ProfileController} />
  </Route>
)
