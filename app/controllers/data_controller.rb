class DataController < ApplicationController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

  # We only have 12 categories, Baby & Toys,Electronics,Kitchen & Tools,Meat,Bakery,Seafood,Milk & Cream,Fruits,Vegetables,Beverage,Snacks,Sports
  CAT_ID_MAP = {
    "Fruits" => "1",
    "Vegetables" => "2",
    "Meat" => "3",
    "Milk & Cream" => "7",
    "Bakery" => "9",
    "Snacks" => "14",
    "Beverage" => "15",
    "Baby & Toys" => "24", #baby  3000016632 diaper 3000651161 baby cereal 3000194950 building bag
    "Electronics" => "25", #electronics 3000407698 earpods 3000176612 photo paper 1027675 headphone
    "Kitchen & Tools" => "26", #kitchen tools 3000225563 bleach 3000698083 mop express 3000090336 trash bag
    "Seafood" => "27", #Seafood 3000408330  Salmon  3000408387  Crab  3000289983  Crab
    "Sports" => "28"  #Sports 3000126994 baseball 3000163876 basketball 3000262540 football
  }

  CAT_DATA = {
    "1" => {
      "single" => [{
                     id: 1022608,
                     query: 'apple'
                   }, {
                     id: 3000014678,
                     query: 'banana'
                   } , {
                     id: 1022853,
                     query: 'grape`'

      }],
      "family" => [{
                     id: 3000039631,
                     query: 'apple'
                   }, {
                     id: 3000012437,
                     query: 'orange'
                   }, {
                     id: 1022852,
                     query: 'grape'
      }]
    },
    "2" => {
      "single" => [{
                     id: 1022647,
                     query: 'broccoli'
                   }, {
                     id: 3000821238,
                     query: 'cucumber'
                   }, {
                     id: 1022658,
                     query:'carrot'
      }],
      "family" => [{
                     id: 3000155746,
                     query: 'onion'
                   }, {
                     id: 3000012194,
                     query: 'carrot'
                   }, {
                     id: 1022648,
                     query: 'broccoli'
      }]
    },
    "3" => {
      "single" => [{
                     id: 1022323,
                     query: 'ribs'
                   }, {
                     id: 1022340,
                     query: 'beef'
                   }, {
                     id: 1022544,
                     query: 'beef'
      }],
      "family" => [{
                     id: 3000025997,
                     query: 'ground beef'
                   }, {
                     id: 3000203098,
                     query: 'tri tip'
                   }, {
                     id: 1022308,
                     query: 'beef'
      }]
    },
    "7" => {
      "single" => [{
                     id: 1014485,
                     query: 'half & half'
                   }, {
                     id: 1014518,
                     query: 'milk'
                   }, {
                     id: 3000885039,
                     query: 'milk'
      }],
      "family" => [{
                     id:1014507,
                     query: 'milk'
                   },{
                     id: 1014506,
                     query: 'milk'
                   }, {
                     id: 1014505,
                     query: 'milk'
      }]
    },
    "9" => {
      "single" => [{
                     id: 3000972766,
                     query: 'bread'
                   }, {
                     id: 3000880839,
                     query: 'bread'
                   }, {
                     id:3000314659,
                     query: 'bread'
      }],
      "family" => [{
                     id:3000845177,
                     query: 'bread'
                   }, {
                     id: 1013693,
                     query: 'bread'
                   }, {
                     id: 3000811615,
                     query: 'bread'
      }]
    },
    "14" => {
      "single" => [{
                     id: 3000986037,
                     query: 'granola bar'
                   }, {
                     id: 3000200589,
                     query: 'brownie'
                   }, {
                     id: 1017934,
                     query: 'trail mix'
      }],
      "family" => [{
                     id: 3001014840,
                     query: 'crunch bar'
                   }, {
                     id: 3000211359,
                     query: 'kind bar'
                   }, {
                     id: 1017915,
                     query: 'granolabar'
      }]
    },
    "15" => {
      "single" => [{
                     id: 1025234,
                     query: 'beer'
                   }, {
                     id: 1025195,
                     query: 'beer'
                   }, {
                     id: 1025237,
                     query: 'beer'
      }],
      "family" => [{
                     id: 3000016124,
                     query: 'beer'
                   }, {
                     id: 3000166465,
                     query: 'beer'
                   }, {
                     id: 1025249,
                     query: 'beer'
      }]
    },
    "24" => {
      "single" => [],
      "family" => [{
                     id: 3000066024,
                     query: 'baby shampoo'
                   }, {
                     id: 1007073,
                     query: 'baby wash'
                   }, {
                     id: 3000019364,
                     query: 'baby shampoo'
      }]
    },
    "25" => {
      "single" => [{
                     id: 3000407698,
                     query: 'earpods'
                   }, {
                     id: 3000176612,
                     query: 'photo paper'
                   }, {
                     id: 1027675,
                     query: 'headphone'
      }],
      "family" => [{
                     id: 3000407698,
                     query: 'earpods'
                   }, {
                     id: 3000176612,
                     query: 'photo paper'
                   }, {
                     id: 1027675,
                     query: 'headphone'
      }]
    },
    "26" => {
      "single" => [{
                     id: 3000225563,
                     query: 'bleach'
                   }, {
                     id: 3000698083,
                     query: 'mop express'
                   }, {
                     id: 3000090336,
                     query: 'trash bag'
      }],
      "family" => [{
                     id: 3000225563,
                     query: 'bleach'
                   }, {
                     id: 3000698083,
                     query: 'mop express'
                   }, {
                     id: 3000090336,
                     query: 'trash bag'
      }]
    },
    "27" => {
      "single" => [{
                     id: 3000408330,
                     query: 'salmon'
                   }, {
                     id: 3000408387,
                     query: 'crab'
                   }, {
                     id: 3000289983,
                     query: 'crab'
      }],
      "family" => [{
                     id: 3000408330,
                     query: 'salmon'
                   }, {
                     id: 3000408387,
                     query: 'crab'
                   }, {
                     id: 3000289983,
                     query: 'crab'
      }]
    },
    "28" => {
      "single" => [{
                     id: 3000126994,
                     query: 'baseball'
                   }, {
                     id: 3000163876,
                     query: 'basketball'
                   }, {
                     id: 3000262540,
                     query: 'football'
      }],
      "family" => [{
                     id: 3000126994,
                     query: 'baseball'
                   }, {
                     id: 3000163876,
                     query: 'basketball'
                   }, {
                     id: 3000262540,
                     query: 'football'
      }]
    }
  }

  GENERAL_LIST_FOR_SINGLE = [
    {id: 1022608, query: 'apple'},
    {id: 1022647, query: 'broccoli'},
    {id: 1022323, query: 'ribs'},
    {id: 1014485, query: 'half & half'},
    {id: 3000177049, query: 'egg'},
    {id: 3000131956, query: 'candy bar'},
    {id: 3000986037, query: 'granola bar'},
    {id: 1025234, query: 'beer'}
  ]

  GENERAL_LIST_FOR_FAMILY = [
    {id: 3000039631, query: 'apple'},
    {id: 3000155746, query: 'onion'},
    {id: 3000025997, query: 'ground beef'},
    {id: 3000840616, query: 'thigh'},
    {id: 1025556, query: 'bacon'},
    {id: 1014507, query: 'milk'},
    {id: 3000601153, query: 'egg'},
    {id: 3000845177, query: 'bread'},
    {id: 3000883056, query: 'cerel'},
    {id: 3000181891, query: 'fruit crisp'},
    {id: 1023721, query: 'soda'}
  ]

  GENERAL_LIST_FOR_MEN = [
    {id: 1022608, query: 'apple'},
    {id: 1022647, query: 'broccoli'},
    {id: 1022323, query: 'ribs'},
    {id: 1014485, query: 'half & half'},
    {id: 3000177049, query: 'egg'},
    {id: 3000131956, query: 'candy bar'},
    {id: 3000986037, query: 'granola bar'},
    {id: 1025234, query: 'beer'},
    {id: 3001126056, query: 'nintendo'},
    {id: 3001146631, query: 'xbox'},
    {id: 1003661, query: 'afer shave'}
  ]

  GENERAL_LIST_FOR_WOMEN = [
    {id: 1022608, query: 'apple'},
    {id: 1022647, query: 'broccoli'},
    {id: 1022323, query: 'ribs'},
    {id: 1014485, query: 'half & half'},
    {id: 3000177049, query: 'egg'},
    {id: 3000131956, query: 'candy bar'},
    {id: 3000986037, query: 'granola bar'},
    {id: 1025234, query: 'beer'},
    {id: 3001141275, query: 'beauty spong'},
    {id: 3000195566, query: 'bronzer brush'},
    {id: 3000323120, query: 'hairspray'}
  ]

  GENERAL_LIST_FOR_KIDS = [
    {id: 3000012437, query: 'clementine'},
    {id: 3000012194, query: 'carrot'},
    {id: 3000690638, query: 'pork rib'},
    {id: 1014506, query: 'milk'},
    {id: 1017599, query: 'pasta'},
    {id: 1007073, query: 'baby shampoo'},
    {id: 1000720, query: 'moist wipe'},
    {id: 3000639553, query: 'dishwasher'}
  ]

  GENERAL_LIST_FOR_PETS = [
    {id: 1022852, query: 'grape'},
    {id: 1022648, query: 'broccoli'},
    {id: 1022308, query: 'beef'},
    {id: 1022482, query: 'pork'},
    {id: 1014505, query: 'milk'},
    {id: 3001243235, query: 'egg'},
    {id: 3000811615, query: 'bread'},
    {id: 3100019657, query: 'prune'},
    {id: 3001145616, query: 'coffee'},
    {id: 3000230725, query: 'dog snack'}
  ]

  BIRTHDAY_PARTY_LIST = [
      {id: 3000820584, query: 'chocolate'},
      {id: 3000776182, query: 'bacon'},
      {id: 3000354238, query: 'pizza'},
      {id: 1025924, query: 'creme cake'},
      {id: 3000817685, query: 'nut muffin'},
      {id: 3000373438, query: 'Dinner Plates'},
      {id: 3000943309, query: 'Cutlery'},
      {id: 3001174734, query: 'berry pie'},
      {id: 3000204881, query: 'twister game'}
  ]

  BABY_SHOWER_LIST = [
      {id: 3000820584, query: 'chocolate'},
      {id: 3000776182, query: 'bacon'},
      {id: 3000354238, query: 'pizza'},
      {id: 1025924, query: 'creme cake'},
      {id: 3000817685, query: 'nut muffin'},
      {id: 3000373438, query: 'Dinner Plates'},
      {id: 3000943309, query: 'Cutlery'},
      {id: 3001174734, query: 'berry pie'},
      {id: 1023721, query: 'soda'}
  ]
  def process_shopping_list
    results = []
    found = false

    params[:list].each do |query|
      item = JSON.parse(find_item_by_query(query).body)['products']

      if item.nil?
        result = { not_found: true }
      else
        found = true
        result = item.first
      end

      result[:query] = query;
      result[:count] = 1
      results << result
    end

    render json: { shopping_list: results, found: found }
  end

  def get_items_by_query
    query = params[:query]
    count = params[:count]
    items = JSON.parse(find_item_by_query(query, count).body)['products']
    items = items.map { |item|
      item[:count] = 1
      item[:query] = query
      item
    }
    render json: { items: items }
  end

  def process_suggestion_list
    # params[:num_household]
    # params[:single]
    # params[:gender]
    # params[:categories]
    # params[:has_kids]
    # params[:event]

    items = []
    is_single = params[:single] || params[:num_household].to_i < 5

    if is_single
      items.concat GENERAL_LIST_FOR_SINGLE.sample(3)
    else
      items.concat GENERAL_LIST_FOR_FAMILY.sample(3)
    end

    if params[:gender] === 'male'
      items.concat GENERAL_LIST_FOR_MEN.sample(3)
    elsif params[:gender] === 'female'
      items.concat GENERAL_LIST_FOR_WOMEN.sample(3)
    end

    items.concat GENERAL_LIST_FOR_KIDS.sample(3) if params[:has_kids]

    params[:categories].split(',').each do |category|
      map_id = CAT_ID_MAP[category]
      if CAT_DATA[map_id]
        if is_single
          items.concat CAT_DATA[map_id]['single'].sample(2)
        else
          items.concat CAT_DATA[map_id]['family'].sample(2)
        end
      end
    end
    if params[:event].present?
      if params[:event] == "baby-shower"
        items.concat BABY_SHOWER_LIST.sample(5)
      elsif params[:event] == "birthday"
        items.concat BIRTHDAY_PARTY_LIST.sample(5)
      end
    end
    results = []
    found = false

    items = items.uniq {|item| item[:id]}

    items.sample(12).each do |item|
      item_response = JSON.parse(find_item_by_id(item[:id]).body)
      next if item_response["statusCode"] == 404
      if item_response.nil?
        result = { not_found: true }
      else
        found = true
        result = item_response
      end

      result[:query] = item[:query]
      result[:count] = 1;
      results << result
    end

    render json: {
      results: results, found: found
    }
  end


  def find_all

    results = []

    CAT_DATA.each do |category_id, data|
      data.each do |type, dd|
        dd.each do |item_id|
          item = JSON.parse(find_item_by_id(item_id).body)

          results << {
            id: item["data"]["id"],
            name: item["data"]["name"]
          }
        end
      end
    end

    render json: {
      results: results
    }
  end

  private

  def find_item_by_query query, count = 1
    # uri = URI.parse "https://grocery-api.walmart.com/v0.1/api/stores/9080/search?query=#{query}&rows=1&start=0"
    uri = URI.parse "https://grocery-api.qa.grocery-api.qa.walmart.com/search?store=9080&query=#{query}&start=0&count=#{count}"
    res = Net::HTTP.get_response uri

    res
  end

  def find_item_by_id product_id
    uri = URI.parse "https://grocery-api.qa.grocery-api.qa.walmart.com/product/#{product_id}?store=9080"

    puts uri
    Net::HTTP.get_response uri
  end

end


# https://grocery-api.walmart.com/v0.1/api/stores/5884/search?query=apple&rows=60&start=0
