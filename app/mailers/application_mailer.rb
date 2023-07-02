class ApplicationMailer < ActionMailer::Base
  default from: "test.jeet.mail@gmail.com"
  layout "mailer"

  def referral_mail(recipient)
    Rails.logger.info "[ApplicationMailer#referral_mail]: Sending the referral mail to email - #{recipient}"
    mail(
      to: recipient,
      subject: 'Check out SwiftRefer - Simplify Referrals!',
      body: '
        Hey,

        I just discovered SwiftRefer, a platform for easy referrals. Join now and refer each other to great opportunities. Check it out at http://localhost:3000/sign_up .
        
        Best,
        Jeet 
      '
    )
  end
end
