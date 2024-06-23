import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import TechnologySection from "./TechnologySection";
import HealthSection from "./HealthSection";
import EducationSection from "./EducationSection";
import * as yup from "yup";

const formSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  surveyTopic: yup.string().required("Survey Topic is required"),
  favoriteLanguage: yup.string().when("surveyTopic", {
    is: "Technology",
    then: yup.string().required("Favorite Programming Language is required"),
  }),
  experienceYears: yup.number().when("surveyTopic", {
    is: "Technology",
    then: yup.number().required("Years of Experience is required"),
  }),
  exerciseFrequency: yup.string().when("surveyTopic", {
    is: "Health",
    then: yup.string().required("Exercise Frequency is required"),
  }),
  dietPreference: yup.string().when("surveyTopic", {
    is: "Health",
    then: yup.string().required("Diet Preference is required"),
  }),
  highestQualification: yup.string().when("surveyTopic", {
    is: "Education",
    then: yup.string().required("Highest Qualification is required"),
  }),
  fieldOfStudy: yup.string().when("surveyTopic", {
    is: "Education",
    then: yup.string().required("Field of Study is required"),
  }),
  feedback: yup
    .string()
    .required("Feedback is required")
    .min(50, "Feedback must be at least 50 characters"),
});

const Form = () => {
  const initialValues = {
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteLanguage: "",
    experienceYears: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const validate = (values) => {
    try {
      formSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err) {
      return err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const { data, loading, error } = useFetch(
    `https://api.example.com/questions?topic=${values.surveyTopic}`
  );

  useEffect(() => {
    if (data) {
      setAdditionalQuestions(data.questions);
    }
  }, [data]);

  const onSubmit = () => {
    alert("Form submitted successfully");
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span>{errors.fullName}</span>}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <label>
        Survey Topic:
        <select
          name="surveyTopic"
          value={values.surveyTopic}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
      </label>

      {values.surveyTopic === "Technology" && (
        <TechnologySection
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {values.surveyTopic === "Health" && (
        <HealthSection
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {values.surveyTopic === "Education" && (
        <EducationSection
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
      )}

      <label>
        Feedback:
        <textarea
          name="feedback"
          value={values.feedback}
          onChange={handleChange}
        />
        {errors.feedback && <span>{errors.feedback}</span>}
      </label>

      {loading && <p>Loading additional questions...</p>}
      {error && <p>Failed to load additional questions</p>}
      {additionalQuestions.map((question, index) => (
        <div key={index}>
          <label>
            {question.label}
            <input type={question.type} name={`additional_${index}`} />
          </label>
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
