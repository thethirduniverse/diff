import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AccountPageController from 'controllers/account_page_controller.js'
import AppController from 'controllers/app_controller.js'
import HomeController from 'controllers/home_controller.js'
import ProfileController from 'controllers/profile_controller.js'
import SignInController from 'controllers/sign_in_controller.js'
import SignUpController from 'controllers/sign_up_controller.js'
import EmailConfirmationController from 'controllers/email_confirmation_controller.js'
import ResetPasswordEmailController from 'controllers/reset_password_email_controller.js'
import ResetPasswordCheckEmailController from 'controllers/reset_password_check_email_controller.js'
import ResetPasswordPasswordController from 'controllers/reset_password_password_controller.js'
import PostFormCard from 'components/post_form_card.jsx'
import PostShowController from 'controllers/post_show_controller.js'

export default (
  <Route path="/" component={AppController}>
    <IndexRoute component={HomeController} />
    <Route path="account" component={AccountPageController}>
      <Route path="sign-in" component={SignInController} />
      <Route path="sign-up" component={SignUpController} />
      <Route path="email-confirmation" component={EmailConfirmationController} />
      <Route path="reset-password">
        <Route path="email" component={ResetPasswordEmailController} />
        <Route path="check-email" component={ResetPasswordCheckEmailController} />
        <Route path="password" component={ResetPasswordPasswordController} />
        <IndexRoute component={ResetPasswordEmailController} />
      </Route>
    </Route>
    <Route path="posts/:id" component={PostShowController} />
    <Route path="posts" component={PostFormCard} />
    <Route path="profiles/:id" component={ProfileController} />
  </Route>
)
