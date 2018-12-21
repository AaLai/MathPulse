class AddRoundToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :round, :integer
  end
end
