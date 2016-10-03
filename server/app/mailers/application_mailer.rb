# frozen_string_literal: true
class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@debatable.com'
  layout 'mailer'
end
