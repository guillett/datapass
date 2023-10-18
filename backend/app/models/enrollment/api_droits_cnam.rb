class Enrollment::ApiDroitsCnam < Enrollment
  include EnrollmentValidators::ValidateAtLeastOneScopePresence

  protected

  def submit_validation
    super

    responsable_technique_validation
    previous_enrollment_id_validation
  end
end
