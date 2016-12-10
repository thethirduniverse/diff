# frozen_string_literal: true
class ReportMailer < ApplicationMailer
  default to: ENV['admin_email']

  def report_user_email(report)
    @creator = report.creator
    @user = report.user
    @content = report.content
    mail(subject: 'New User Report Created')
  end

  def report_topic_email(report)
    @creator = report.creator
    @topic = report.topic
    @content = report.content
    mail(subject: 'New Topic Report Created')
  end

  def report_reply_email(report)
    @creator = report.creator
    @reply = report.reply
    @content = report.content
    mail(subject: 'New Reply Report Created')
  end
end
