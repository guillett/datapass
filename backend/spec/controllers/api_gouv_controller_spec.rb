RSpec.describe ApiGouvController, type: :controller do
  describe "#apis_list" do
    it "has success status" do
      expect(response).to have_http_status(:ok)
    end
  end
end
