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

Question.destroy_all
Category.destroy_all

cat0 = Category.create!({name: 'Exponents', catnum: 1})
cat1 = Category.create!({name: 'Fractions', catnum: 2})
cat2 = Category.create!({name: 'BEDMAS', catnum: 3})
cat3 = Category.create!({name: 'Algebra', catnum: 4})

categories = [cat0, cat1, cat2, cat3]
questions = ["What is 3 squared?", "What is three quarters of 5?", "What comes first * or +?", "If x = 6 what is 3x?"]
answers = [['3^2', '5', '0'], ['4', '1/2', '0.33'], ['2', 'Undefined', '0'], ['1', '3/4', '0']]

## PRODUCTS

puts "Re-creating Questions ..."

5.times do |y|
  4.times do |x|
    4.times do |index|
      categories[x].questions.create!({
      qtext:  questions[x],
      a1: rand(5..9).to_s + '/' + rand(2..4).to_s,
      a2: rand(0..2).to_s,
      a3: 'Correct Answer',
      a4: rand(1..6).to_s + '^' + rand(1..4).to_s,
      correct_answer: 'Correct Answer',
      level: index,
      round: y
    })
    end
  end
end

p "Created #{Question.count} questions."
