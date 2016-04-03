class DataController < ApplicationController
  skip_before_filter :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

  SERVICES = [
    # "https://grocery-api-stg1.walmart.com",
    # "https://grocery-api-stg2.walmart.com",
    "https://grocery-api.qa.grocery-api.qa.walmart.com"
  ]
  # We only have 12 categories, Baby & Toys,Electronics,Kitchen & Tools,Meat,Bakery,Seafood,Milk & Cream,Fruits,Vegetables,Beverage,Snacks,Sports
  CAT_ID_MAP = {
    "Fruits" => "1",
    "Vegetables" => "2",
    "Meat" => "3",
    # "poultry" => "4",
    # "pork" => "5",
    # "bacon, hot dog & sausage" => "6",
    "Milk & Cream" => "7",
    # "egg" => "8",
    "Bakery" => "9",
    # "cereal & breakfast food" => "10",
    # "pasta, potatoes & side dishes" => "11",
    # "candy" => "12",
    # "nuts & dried fruit" => "13",
    "Snacks" => "14",
    "Beverage" => "15",
    # "coffee" => "16",
    # "soft drinks" => "17",
    # "baby bath & skin care" => "18",
    # "diapers & wipes" => "19",
    # "dogs" => "20",
    # "cats" => "21",
    # "dish detergents" => "22",
    # "cleaners" => "23",
    "Baby & Toys" => "24", #baby  3000016632 diaper 3000651161 baby cereal 3000194950 building bag
    "Electronics" => "25", #electronics 3000407698 earpods 3000176612 photo paper 3001277674 movie
    "Kitchen & Tools" => "26", #kitchen tools 3000225563 bleach 3000698083 mop express 3000090336 trash bag
    "Seafood" => "27", #Seafood	3000408330	Salmon	3000408387	Crab	3000289983	Crab
    "Sports" => "28"  #Sports 3000126994 baseball 3000163876 basketball 3000262540 football
  }

  CAT_DATA = {
    "1" => {
      "single" => [1022608, 3000014678, 1022853],
      "family" => [3000039631,3000012437, 1022852]
    },
    "2" => {
      "single" => [1022647, 3000821238, 1022658],
      "family" => [3000155746, 3000012194, 1022648]
    },
    "3" => {
      "single" => [1022323, 1022340, 1022544],
      "family" => [3000025997, 3000203098, 1022308]
    },
    "4" => {
      "single" => [3000191983],
      "family" => [3000840616, 3000229016]
    },
    "5" => {
      "single" => [3000643818, 3000080214, 3000548865],
      "family" => [3000320967, 3000690638]
    },
    "6" => {
      "single" => [3000620524, 3000263966, 3000626616],
      "family" => [1025556, 3000776182, 1025639]
    },
    "7" => {
      "single" => [1014485, 1014518, 3000885039],
      "family" => [1014507, 1014506, 1014505]
    },
    "8" => {
      "single" => [3000177049, 1014792, 3000101124],
      "family" => [3000601153, 3000100925, 3001243235]
    },
    "9" => {
      "single" => [3000972766, 3000880839, 3000314659],
      "family" => [3000845177, 1013693, 3000811615]
    },
    "10" => {
      "single" => [1018998, 1019133, 3000883047],
      "family" => [3000883056, 3000061872, 1018976]
    },
    "11" => {
      "single" => [3000026326, 1017623, 1017556],
      "family" => [3001241921, 1017599, 1021587]
    },
    "12" => {
      "single" => [3000131956, 3000669809, 3000039746],
      "family" => [1000500, 3000147264, 3000820584]
    },
    "13" => {
      "single" => [3000230535, 3001136825, 3000736344],
      "family" => [3000181891, 3000095494, 3100019657]
    },
    "14" => {
      "single" => [3000986037, 3000200589, 1017934],
      "family" => [3001014840, 3000211359, 1017915]
    },
    "15" => {
      "single" => [1025234, 1025195, 1025237],
      "family" => [3000016124, 3000166465, 1025249]
    },
    "16" => {
      "single" => [3000282040, 3000292203, 3000135087],
      "family" => [3000703577, 3001169013, 3001145616]
    },
    "17" => {
      "single" => [1023691, 3000058212, 1023613],
      "family" => [1023721, 1023735, 1023632]
    },
    "18" => {
      "single" => [],
      "family" => [3000066024, 1007073, 3000019364]
    },
    "19" => {
      "single" => [],
      "family" => [3000649260, 1000720, 1000703]
    },
    "20" => {
      "single" => [3000029442, 3000089401, 1004298],
      "family" => [3000039464, 1004331, 3000230725]
    },
    "21" => {
      "single" => [1004271, 3001015999, 1004204],
      "family" => [1004271, 3001015999, 1004204]
    },
    "22" => {
      "single" => [3000639462, 3001037920, 3100039423],
      "family" => [3000288208, 3000639553, 3001054070]
    },
    "23" => {
      "single" => [3000629097, 3000201043, 1005560],
      "family" => [1005573, 3000109546, 3000745299]
    }
  }

  GENERAL_LIST_FOR_SINGLE = [
    1022608,
    1022647,
    1022323,
    1014485,
    3000177049,
    3000131956,
    3000986037,
    1025234
  ]

  GENERAL_LIST_FOR_FAMILY = [
    3000039631,
    3000155746,
    3000025997,
    3000840616,
    1025556,
    1014507,
    3000601153,
    3000845177,
    3000883056,
    3000181891,
    1023721
  ]

  GENERAL_LIST_FOR_MEN = [
    1022608,
    1022647,
    1022323,
    1014485,
    3000177049,
    3000131956,
    3000986037,
    1025234,
    3001126056,
    3001146631,
    1003661
  ]

  GENERAL_LIST_FOR_WOMEN = [
    1022608,
    1022647,
    1022323,
    1014485,
    3000177049,
    3000131956,
    3000986037,
    1025234,
    3001141275,
    3000195566,
    3000323120
  ]

  GENERAL_LIST_FOR_KIDS = [
    3000012437,
    3000012194,
    3000690638,
    1014506,
    1017599,
    1007073,
    1000720,
    3000639553
  ]

  GENERAL_LIST_FOR_PETS = [
    1022648,
    1022308,
    1014505,
    3001243235,
    3000811615,
    3100019657,
    3001145616,
    3000019364,
    1000703,
    3000230725
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

    item_ids = []
    is_single = params[:single] || params[:num_household].to_i < 5

    if is_single
      item_ids.concat GENERAL_LIST_FOR_SINGLE.sample(3)
    else
      item_ids.concat GENERAL_LIST_FOR_FAMILY.sample(3)
    end

    if params[:gender] === 'male'
      item_ids.concat GENERAL_LIST_FOR_MEN.sample(3)
    elsif params[:gender] === 'female'
      item_ids.concat GENERAL_LIST_FOR_WOMEN.sample(3)
    end

    item_ids.concat GENERAL_LIST_FOR_KIDS.sample(3) if params[:has_kids]

    params[:categories].split(',').each do |category|
      if CAT_DATA[category]
        if is_single
          item_ids.concat CAT_DATA[category]['single'].sample(2)
        else
          item_ids.concat CAT_DATA[category]['family'].sample(2)
        end
      end
    end

    results = []

    item_ids.sample(10).each do |item_id|
      item = JSON.parse(find_item_by_id(item_id).body)

      if item.nil?
        result = { not_found: true }
      else
        found = true
        result = item
      end

      result[:count] = 1;
      results << result
    end

    render json: {
      results: results
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
    uri = URI.parse "https://grocery-api.qa.grocery-api.qa.walmart.com/search?store=9080&query=#{query}&start=0&count=#{count}"
    res = Net::HTTP.get_response uri

    res
  end

  def find_item_by_id product_id
    uri = URI.parse "https://grocery-api.qa.grocery-api.qa.walmart.com/product/#{product_id}?store=5884"

    puts uri
    Net::HTTP.get_response uri
  end

end
