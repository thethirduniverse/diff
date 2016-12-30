# frozen_string_literal: true
module FeedSpecification
  class NotImplementedError < StandardError
  end

  class FeedSpecification
    def initialize(batch_size, offset)
      @batch_size = batch_size
      @offset = offset
    end

    def posts
      base.where('posts.root_post_id IS NULL').order(created_at: :desc).offset(@offset).first(@batch_size + 1)
    end

    def base
      raise NotImplementedError
    end

    attr_reader :batch_size

    attr_reader :offset
  end

  class NewestFeedSpecification < FeedSpecification
    def initialize(batch_size, offset: 0)
      super(batch_size, offset)
    end

    def base
      Post
    end
  end

  class CategoryFeedSpecification < FeedSpecification
    def initialize(batch_size, category_id, offset: 0)
      super(batch_size, offset)
      @category_id = category_id
    end

    def base
      Category.find(@category_id).posts
    end
  end

  class OtherFeedSpecification < FeedSpecification
    def initialize(batch_size, offset: 0)
      super(batch_size, offset)
    end

    def base
      Post.includes(:posts_categories).where(posts_categories: { category_id: nil })
    end
  end

  class UserFeedSpecification < FeedSpecification
    def initialize(batch_size, user_id, offset: 0)
      super(batch_size, offset)
      @user_id = user_id
    end

    def base
      User.find(@user_id).posts
    end
  end

  class UserCategorySpecification < UserFeedSpecification
    def initialize(batch_size, user_id, category_id, offset: 0)
      super(batch_size, user_id, offset: offset)
      @category_id = category_id
    end

    def base
      super.joins(:posts_categories).where(posts_categories: { category_id: @category_id })
    end
  end
end
