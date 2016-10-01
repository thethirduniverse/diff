module CategoryHelper
  def default_categories
    Category.all.map do |c|
      category_response c
    end
  end

  def category_response(c)
    {
      id: c.id,
      name: c.name
    }
  end
end
