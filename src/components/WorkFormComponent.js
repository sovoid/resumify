import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";

const WorkFormComponent = ({
  index,
  data,
  formData,
  setFormData,
}) => {
  const {
    company,
    position,
    website,
    startDate,
    endDate,
    summary,
    highlights,
  } = data;

  /**
   *
   * @param {Number} idx Index # of the work
   * @param {String} fieldName Name of the field
   * @param {String} value New value for the field
   */
  const updateWorkData = (idx, fieldName, value) => {
    formData.work[idx] = {
      ...formData.work[idx],
      [fieldName]: value,
    };
    setFormData({
      ..._.set(formData, "work", formData.work),
    });
  };

  const handleRemoveWork = (idx) => {
    formData.work = _.concat(
      _.slice(formData.work, 0, idx),
      _.slice(formData.work, idx + 1)
    );
    setFormData({
      ...formData,
      work: formData.work,
    });
  };

  return (
    <div className="my-3">
      <h4 className="mb-2 text-center">
        {data.company && data.position
          ? `${data.position} at ${data.company}`
          : `Work ${index + 1}`}
      </h4>
      <Form.Group>
        <Form.Label>Company</Form.Label>
        <Form.Control
          type="text"
          name="company"
          value={company}
          onChange={(e) => updateWorkData(index, "company", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          name="position"
          value={position}
          onChange={(e) => updateWorkData(index, "position", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="text"
          name="website"
          onChange={(e) => updateWorkData(index, "website", e.target.value)}
          value={website}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            onChange={(e) => updateWorkData(index, "startDate", e.target.value)}
            value={startDate}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            onChange={(e) => updateWorkData(index, "endDate", e.target.value)}
            value={endDate}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Label>Work Summay</Form.Label>
        <Form.Control
          type="text"
          name="workSummary"
          onChange={(e) => updateWorkData(index, "summary", e.target.value)}
          value={summary}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Highlights</Form.Label>
        <Form.Control
          as="textarea"
          name="highlights"
          onChange={(e) =>
            updateWorkData(
              index,
              "highlights",
              e.target.value.replace(/\r/g, "").split("\n")
            )
          }
          value={highlights.join("\n")}
          required
        />
      </Form.Group>
      <div className="text-center">
        <Button variant="danger" onClick={() => handleRemoveWork(index)}>
          Remove
        </Button>
      </div>
      <hr />
    </div>
  );
};

WorkFormComponent.propTypes = {
  index: PropTypes.number,
  data: PropTypes.exact({
    company: PropTypes.string,
    position: PropTypes.string,
    website: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    summary: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }),
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

export default WorkFormComponent;
