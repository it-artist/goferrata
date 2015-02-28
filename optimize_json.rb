require 'json'

original = JSON.parse(File.read('data/ferrats.json'))

optimized = []
original.each do |ferrata|
  next if ferrata["lon"] == "empty"
  ferrata["title"] = ferrata.delete("name")
  ferrata["lng"] = ferrata.delete("lon")
  ferrata["targetMax"] = ferrata.delete("target").to_s.sub('m', '').to_i
  ferrata["difficulty"] = ferrata.delete("difficulty")[1].to_i
  duration = ferrata.delete("duration").split(':')
  ferrata["duration"] = (duration[0].to_i * 60) + duration[1].to_i
  ferrata["duration"] = nil if ferrata["duration"] == 0
  optimized << ferrata
end

File.open('public/ferrats-optimized.json', 'w') {|f| f.write(optimized.to_json)}
