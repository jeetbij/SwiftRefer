class Referral < ApplicationRecord
    belongs_to :user


    def self.get_user_referrals(user_id)
        Referral.where(user_id: user_id)
    end

    def self.create_user_referral(user_obj, data_hash)
        user_obj.referrals.create!(data_hash)
    end

    def as_json(additional_options = {})
        options = {
            except: %i[user_id]
        }.merge(additional_options)

        super(options)
    end
end
