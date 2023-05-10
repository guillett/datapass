class Enrollment::ApiImpotParticulierFcUniquePolicy < Enrollment::UniquePolicy
  include DgfipPolicyMethods

  def permitted_attributes
    res = super

    res.concat([
      scopes: impot_particulier_fc_permitted_scopes
    ])

    res
  end
end
