# frozen_string_literal: true
module DiffHelper
  require 'English'

  class ContentNotChangedError < StandardError
  end

  class CommandFailedError < StandardError
  end

  # rubocop:disable MethodLength, Metrics/AbcSize
  def create_patch(src, dst)
    f1 = Tempfile.open('diff-src', Rails.root.join('tmp'))
    f2 = Tempfile.open('diff-dst', Rails.root.join('tmp'))

    begin
      f1.print(src)
      f1.flush
      f2.print(dst)
      f2.flush

      patch = `git diff --no-index --word-diff --unified=0 #{f1.path} #{f2.path}`
    ensure
      f1.close
      f1.unlink
      f2.close
      f2.unlink
    end

    raise ContentNotChangedError if $CHILD_STATUS.exitstatus.zero?
    raise CommandFailedError unless $CHILD_STATUS.exitstatus == 1
    patch
  end
end
