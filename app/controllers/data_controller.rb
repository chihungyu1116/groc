class DataController < ApplicationController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

  POLARIS_SEARCH_API = 'http://vsearch.glb.prod.walmart.com/search?response_group=medium&query='

  def process_shopping_list
    result = []

    params[:list].each do |query|
      item = JSON.parse(query_item(query).body)['products'].first
      item[:query] = query;
      result << item
    end

    render json: { shopping_list: result }
  end

  def get_items_by_query
    query = params[:query]
    count = params[:count]
    items = JSON.parse(query_item(query, count).body)['products']
    items = items.map { |item|
      item[:count] = 1
      item[:query] = query
      item
    }
    render json: { items: items }
  end

  private

  def query_item query, count = 1
    uri = URI.parse "https://grocery-api.qa.grocery-api.qa.walmart.com/search?store=5884&query=#{query}&start=0&count=#{count}"
    Net::HTTP.get_response uri
  end

end
