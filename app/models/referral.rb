class Referral < ApplicationRecord
    belongs_to :user

    after_create_commit :send_referral_mail

    def self.get_user_referrals(user_id)
        Referral.where(user_id: user_id).order(id: :desc)
    end

    def self.create_user_referral(user_obj, data_hash)
        user_obj.referrals.create!(data_hash)
    end

    def send_referral_mail
        sleep(2)
        # ApplicationMailer.referral_mail(email).deliver_now
    end

    def as_json(additional_options = {})
        options = {
            except: %i[user_id]
        }.merge(additional_options)

        super(options)
    end
end
