# frozen_string_literal: true
class ReportMailer < ApplicationMailer
  default to: ENV['admin_email']

  def report_user_email(report)
    @creator = report.creator
    @user = report.user
    @content = report.content
    mail(subject: 'New User Report Created')
  end

  def report_post_email(report)
    @creator = report.creator
    @post = report.post
    @parent = report.post.parent_post
    @root = report.post.root_post
    @content = report.content
    mail(subject: 'New Post Report Created')
  end

  def report_edit_email(report)
    @creator = report.creator
    @edit = report.edit
    @post = report.edit.post
    @content = report.content
    mail(subject: 'New Edit Report Created')
  end
end
