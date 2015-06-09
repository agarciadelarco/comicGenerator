class CreateComics < ActiveRecord::Migration
  def change
    create_table :comics do |t|

      t.timestamps null: false
    end
  end
end
