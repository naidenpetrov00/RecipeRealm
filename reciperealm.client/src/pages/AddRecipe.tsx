import styles from "./Common/Form.module.css";

const AddRecipe = () => {
  return (
    <form className={styles.form}>
      <div className="form-group">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            placeholder=" Recipe Name"
            required
          />
          <label htmlFor="email" className="form-label">
            Recipe Name
          </label>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Cooking Steps
        </label>
        <textarea
          className="form-control"
          name="email"
          id="email"
          rows={4}
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor="inputState">Difficulty</label>
          <select id="inputState" className="form-control">
            <option selected>EAZY</option>
            <option>MEDIUM</option>
            <option>HARD</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">Cooking Time</label>
          <div className="cs-form">
            <input type="time" className="form-control" />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            Check me out
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
    </form>
  );
};

export default AddRecipe;
