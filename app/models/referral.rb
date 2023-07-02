class Referral < ApplicationRecord

    validates :email, :presence => true

    belongs_to :user

    after_create_commit :send_referral_mail

    def self.get_user_referrals(user_id)
        Referral.where(user_id: user_id).order(id: :desc)
    end

    def self.create_user_referral(user_obj, data_hash)
        user_obj.referrals.create!(data_hash)
    end

    def send_referral_mail
        ApplicationMailer.referral_mail(email).deliver_now
    rescue StandardError => e
        Rails.logger.error "[REFERRAL]: Failed to send referral email to the user - #{email}"
    end

    def as_json(additional_options = {})
        options = {
            except: %i[user_id]
        }.merge(additional_options)

        super(options)
    end
end
