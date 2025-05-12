import Navbar from "./Navbar";

export default function Contentguidline() {
  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="row justify-content-center align-items-center py-4">
          <div className="col-lg-10 col-md-12 col-12">
            <form action="#" method="POST">
              <div className="card shadow-sm bg-light p-4">
                <h3 className="text-center text-primary mb-4 text-uppercase">
                  Your Content Guideline
                </h3>

                {/* Presentation Section */}
                <div className="row mb-4">
                  <h5 className="text-secondary">Presentation</h5>
                  <div className="col-md-12">
                    <label htmlFor="presentation" className="form-label">
                      Presentation of Site
                    </label>
                    <input
                      type="text"
                      name="presentation"
                      id="presentation"
                      className="form-control"
                      placeholder="Enter Presentation Details"
                    />
                  </div>
                </div>

                {/* Topic Section */}
                <div className="row mb-4">
                  <h5 className="text-secondary">Topic</h5>
                  <div className="col-md-6">
                    <label htmlFor="preferred-topic" className="form-label">
                      Preferred Topic <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="preferred-topic"
                      name="preferred-topic"
                      required
                    >
                      <option value="" disabled selected>
                        Select Preferred Topic
                      </option>
                      <option value="topic1">Topic 1</option>
                      <option value="topic2">Topic 2</option>
                      <option value="topic3">Topic 3</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="avoid-topic" className="form-label">
                      Topic to Avoid <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="avoid-topic"
                      name="avoid-topic"
                      required
                    >
                      <option value="" disabled selected>
                        Select Topic to Avoid
                      </option>
                      <option value="avoid1">Topic 1</option>
                      <option value="avoid2">Topic 2</option>
                      <option value="avoid3">Topic 3</option>
                    </select>
                  </div>
                </div>

                {/* Comment Regarding Topic */}
                <div className="mb-4">
                  <label htmlFor="comment-topic" className="form-label">
                    Comment Regarding Topic <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="comment-topic"
                    name="comment-topic"
                    rows="3"
                    placeholder="Enter comments"
                    required
                  ></textarea>
                </div>

                {/* Target URLs Section */}
                <div className="row mb-4">
                  <h5 className="text-secondary">Target URLs</h5>
                  <div className="col-md-6">
                    <label htmlFor="target-url-1" className="form-label">
                      Target URL Implementation <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="target-url-1"
                      name="target-url-1"
                      required
                    >
                      <option value="" disabled selected>
                        Select Target URL Implementation
                      </option>
                      <option value="url1">URL Option 1</option>
                      <option value="url2">URL Option 2</option>
                      <option value="url3">URL Option 3</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="placement-url-1" className="form-label">
                      Placement of Target URL 1 <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="placement-url-1"
                      name="placement-url-1"
                      required
                    >
                      <option value="" disabled selected>
                        Select Placement for URL 1
                      </option>
                      <option value="placement1">Placement Option 1</option>
                      <option value="placement2">Placement Option 2</option>
                      <option value="placement3">Placement Option 3</option>
                    </select>
                  </div>
                </div>

                {/* Comment Regarding Target URLs */}
                <div className="mb-4">
                  <label htmlFor="target-url-comment" className="form-label">
                    Comment Regarding Target URLs
                    <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="target-url-comment"
                    name="target-url-comment"
                    rows="3"
                    placeholder="Enter comments"
                    required
                  ></textarea>
                </div>

                {/* Trust Links Section */}
                <div className="row mb-4">
                  <h5 className="text-secondary">Trust Links</h5>
                  <div className="col-md-6">
                    <label htmlFor="num-trust-links" className="form-label">
                      Number of Trust Links <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="num-trust-links"
                      name="num-trust-links"
                      required
                    >
                      <option value="" disabled selected>
                        Select Number of Trust Links
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="prefer-trust-link" className="form-label">
                      Preferred Domain for Trust Link
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="prefer-trust-link"
                      name="prefer-trust-link"
                      placeholder="Enter Preferred Domain"
                      required
                    />
                  </div>
                </div>

                {/* Custom Guidelines Section */}
                <div className="row mb-4">
                  <h5 className="text-secondary">Custom Guidelines</h5>
                  <div className="col-md-12">
                    <label htmlFor="guideline" className="form-label">
                      If the site has its more specific guidelines, they can be uploaded here (only PDF)
                    </label>
                    <input
                      type="file"
                      name="guideline"
                      id="guideline"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Save Guideline Button */}
                <div className="row">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-sm btnn text-white rounded px-4 mt-4 w-100"
                      type="submit"
                    >
                      Save Guideline
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
