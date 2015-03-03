require 'json'

original = JSON.parse(File.read('data/ferrats.json'))

optimized = []
original.each do |ferrata|
  ferrata["lng"] = ferrata.delete("lon")
  ferrata["height"] = ferrata.delete("targetheight")
  ferrata.delete('difficultynum')
  ferrata["difficulty"] = ferrata.delete('difficultystr')
  ferrata["link"] = ferrata.delete('link').sub('http://klettersteig.de/klettersteig/', '')
  ferrata["slug"] = ferrata["link"].gsub('/', '-').gsub('_', '-')
  optimized << ferrata
end

File.open('public/ferrats-optimized.json', 'w') {|f| f.write(optimized.to_json)}
