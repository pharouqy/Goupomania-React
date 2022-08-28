const Home = () => {
  return (
    <div className="container profile-page">
      <div className="row center-profil">
        <div className="col-xl-6 col-lg-7 col-md-12">
          <form>
            <h1>The Wall</h1>
            <div className="form-group row">
              <label htmlFor="message" className="col-4 col-form-label">
                Message
              </label>
              <div className="col-8">
                <textarea
                  id="message"
                  name="message"
                  cols="40"
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="picture" className="col-4 col-form-label">
                Picture
              </label>
              <div className="col-8">
                <input
                  id="picture"
                  name="post_image"
                  type="file"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="offset-4 col-8">
                <button name="submit" type="submit" className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
