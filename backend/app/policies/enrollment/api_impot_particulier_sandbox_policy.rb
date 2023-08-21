class Enrollment::ApiImpotParticulierSandboxPolicy < Enrollment::SandboxPolicy
  include DgfipPolicyMethods

  def permitted_attributes
    res = super

    res.concat([
      scopes: impot_particulier_permitted_scopes
    ])

    res
  end
end
