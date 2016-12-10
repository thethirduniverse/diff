# frozen_string_literal: true
class ReportsController < ApplicationController
  clear_respond_to
  respond_to :json
  before_action :authenticate_user!

  def report_user
    report = UserReport.new(report_user_params)
    ReportMailer.delay.report_user_email(report) if render_response(report)
  end

  def report_topic
    report = TopicReport.new(report_topic_params)
    ReportMailer.delay.report_topic_email(report) if render_response(report)
  end

  def report_reply
    report = ReplyReport.new(report_reply_params)
    ReportMailer.delay.report_reply_email(report) if render_response(report)
  end

  private

  def report_user_params
    ps = params.require(:report).permit(:user_id, :content)
    params_with_current_user(ps)
  end

  def report_topic_params
    ps = params.require(:report).permit(:topic_id, :content)
    params_with_current_user(ps)
  end

  def report_reply_params
    ps = params.require(:report).permit(:reply_id, :content)
    params_with_current_user(ps)
  end

  def params_with_current_user(params)
    params[:creator] = current_user
    params
  end

  def render_response(report)
    if report.valid?
      report.save!
      render json: {}, status: 200
      return true
    else
      render json: {
        errors: report.errors.messages
      }, status: 422
      return false
    end
  end
end
