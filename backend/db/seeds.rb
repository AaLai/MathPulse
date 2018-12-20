# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

# Let's do this ...

## CATEGORIES

puts "Finding or Creating Categories ..."

Category.destroy_all

cat1 = Category.find_or_create_by! name: 'Exponents'
cat2 = Category.find_or_create_by! name: 'Fractions'
cat3 = Category.find_or_create_by! name: 'Order of Operations'

## PRODUCTS

puts "Re-creating Questions ..."

Question.destroy_all

10.times do |index|
  cat1.questions.create!({
  qtext:  'What is 3 squared?',
  ans1: Faker::Name.unique.name,
  ans2: Faker::Name.unique.name,
  ans3: Faker::Name.unique.name,
  ans4: Faker::Name.unique.name
})
end

10.times do |index|
  cat2.questions.create!({
  qtext:  'What is 3 divided by 9?',
  ans1: Faker::Name.unique.name,
  ans2: Faker::Name.unique.name,
  ans3: Faker::Name.unique.name,
  ans4: Faker::Name.unique.name
})
end

10.times do |index|
  cat3.questions.create!({
  category_id: 6,
  qtext:  'Plot a line that goes through (0,0).',
  ans1: Faker::Name.unique.name,
  ans2: Faker::Name.unique.name,
  ans3: Faker::Name.unique.name,
  ans4: Faker::Name.unique.name
})
end
p "Created #{Question.count} questions"
