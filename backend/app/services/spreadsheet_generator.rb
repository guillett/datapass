class SpreadsheetGenerator
  attr_reader :enrollments

  def initialize(enrollments)
    @enrollments = enrollments
  end

  def perform
    spreadsheet_generator = Axlsx::Package.new
    workbook = spreadsheet_generator.workbook

    sheet = create_sheet(workbook)
    add_rows(sheet)

    spreadsheet_generator.to_stream.read
  end

  private
  def enrollment_attributes
    %w[id target_api created_at updated_at status organization_id siret nom_raison_sociale zip_code
       technical_team_type technical_team_value demarche intitule description type_projet
       date_mise_en_production volumetrie_approximative scopes data_recipients data_retention_period
       data_retention_comment fondement_juridique_title fondement_juridique_url demandeur_email
       team_members_json cgu_approved dpo_is_informed additional_content linked_token_manager_id
       previous_enrollment_id copied_from_enrollment_id link]
  end

  def create_sheet(workbook)
    workbook.add_worksheet(name: 'DataPass Habilitations') do |sheet|
      sheet.add_row(enrollment_attributes)
      sheet
    end
  end

  def add_rows(sheet)
    @enrollments.each do |e|
      sheet.add_row(enrollment_attributes.map { |attr| e.send(attr.to_sym) })
    end
  end
end
