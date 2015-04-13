require 'json'

original = JSON.parse(File.read('data/ferrats.json'))

mapping = {
  "1"   => "A",
  "1.5" => "A",
  "2"   => "A/B",
  "2.5" => "B",
  "3"   => "B/C",
  "3.5" => "C",
  "4"   => "C/D",
  "4.5" => "D",
  "5"   => "D/E",
  "5.5" => "E",
  "6"   => "E/F",
  "6.5" => "F"
}

optimized = []
original.each do |ferrata|
  ferrata["lng"] = ferrata.delete("lon")
  ferrata["height"] = ferrata.delete("targetheight")
  ferrata["slug"] = ferrata["link"].split('/').first
  ferrata["difficulty"] = mapping[ferrata.delete("difficultynumeric").to_s]
  optimized << ferrata
end

File.open('public/ferrats-optimized.json', 'w') {|f| f.write(optimized.to_json)}
