# frozen_string_literal: true
class MainController < ApplicationController
  def index
    @bootstrap = {}.to_json
  end
end
