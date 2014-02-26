class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
	  t.date         :date_time
	  t.string       :file_name
	  t.timestamps
    end
  end
end
