class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :qtext
      t.string :a1
      t.string :a2
      t.string :a3
      t.string :a4
      t.string :correct_answer
      t.integer :level
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
