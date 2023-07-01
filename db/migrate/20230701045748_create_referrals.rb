class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :email, null: false

      t.timestamps
    end

    add_index :referrals, [:user_id, :email], unique: true

  end
end
