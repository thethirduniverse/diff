# frozen_string_literal: true
module DiffHelper
  require 'English'

  class ContentNotChangedError < StandardError
  end

  class CommandFailedError < StandardError
  end

  class VersionNotFoundError < StandardError
  end

  def create_patch(src, dst)
    Dir.mktmpdir do |dir|
      Dir.chdir(dir) do
        f1 = open('src', 'w')
        f2 = open('dst', 'w')
        f1.print(src)
        f1.flush
        f2.print(dst)
        f2.flush

        patch = `git diff --no-index --no-prefix --unified=2 src dst`
        raise ContentNotChangedError if $CHILD_STATUS.exitstatus.zero?
        raise CommandFailedError unless $CHILD_STATUS.exitstatus == 1
        return patch
      end
    end
  end

  # rubocop:disable AbcSize
  def post_with_version(post_id, version)
    # version starts at 0, to revert to version 0, for example, we need to read one edit
    count = version + 1
    edits = Edit.where(post_id: post_id).order(version: :asc).limit(count)
    raise VersionNotFoundError if edits.count < count

    Dir.mktmpdir do |dir|
      Dir.chdir(dir) do
        open('src', 'w') { |f| }
        edits.each do |edit|
          open('patch', 'w') { |f| f << edit.patch }

          `patch -p0 < patch`

          raise CommandFailedError unless $CHILD_STATUS.exitstatus.zero?
        end

        return File.read('src')
      end
    end
  end
end
