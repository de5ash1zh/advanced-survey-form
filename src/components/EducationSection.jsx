import React from "react";

const EducationSection = ({ values, handleChange, errors }) => (
  <div>
    <label>
      Highest Qualification:
      <select
        name="highestQualification"
        value={values.highestQualification}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="High School">High School</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
        <option value="PhD">PhD</option>
      </select>
      {errors.highestQualification && (
        <span>{errors.highestQualification}</span>
      )}
    </label>
    <label>
      Field of Study:
      <input
        type="text"
        name="fieldOfStudy"
        value={values.fieldOfStudy}
        onChange={handleChange}
      />
      {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
    </label>
  </div>
);

export default EducationSection;
