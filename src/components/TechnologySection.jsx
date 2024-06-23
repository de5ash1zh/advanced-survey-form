import React from "react";

const TechnologySection = ({ values, handleChange, errors }) => (
  <div>
    <label>
      Favorite Programming Language:
      <select
        name="favoriteLanguage"
        value={values.favoriteLanguage}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="C#">C#</option>
      </select>
      {errors.favoriteLanguage && <span>{errors.favoriteLanguage}</span>}
    </label>
    <label>
      Years of Experience:
      <input
        type="number"
        name="experienceYears"
        value={values.experienceYears}
        onChange={handleChange}
      />
      {errors.experienceYears && <span>{errors.experienceYears}</span>}
    </label>
  </div>
);

export default TechnologySection;
