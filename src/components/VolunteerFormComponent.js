import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import _ from "lodash";

const VolunteerFormComponent = ({ index, data, formData, setFormData }) => {
  const {
    organization,
    position,
    website,
    startDate,
    endDate,
    summary,
    highlights,
  } = data;

  /**
   *
   * @param {Number} idx Index #
   * @param {String} fieldName Name of the field
   * @param {String} value New value for the field
   */
  const updateVolunteeringData = (idx, fieldName, value) => {
    formData.volunteer[idx] = {
      ...formData.volunteer[idx],
      [fieldName]: value,
    };
    setFormData({
      ..._.set(formData, "volunteer", formData.volunteer),
    });
  };

  const handleRemoveVolunteering = (idx) => {
    formData.volunteer = _.concat(
      _.slice(formData.volunteer, 0, idx),
      _.slice(formData.volunteer, idx + 1)
    );
    setFormData({
      ...formData,
      volunteer: formData.volunteer,
    });
  };

  return (
    <div className="my-3">
      <h4 className="mb-2 text-center">
        {data.organization && data.position
          ? `${data.position} at ${data.organization}`
          : `Volunteering ${index + 1}`}
      </h4>
      <Form.Group>
        <Form.Label>Organization*</Form.Label>
        <Form.Control
          type="text"
          name="organization"
          value={organization}
          onChange={(e) => updateVolunteeringData(index, "organization", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Position*</Form.Label>
        <Form.Control
          type="text"
          name="position"
          value={position}
          onChange={(e) => updateVolunteeringData(index, "position", e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Website*</Form.Label>
        <Form.Control
          type="text"
          name="website"
          onChange={(e) => updateVolunteeringData(index, "website", e.target.value)}
          value={website}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Start Date*</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            onChange={(e) => updateVolunteeringData(index, "startDate", e.target.value)}
            value={startDate}
            required
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            onChange={(e) => updateVolunteeringData(index, "endDate", e.target.value)}
            value={endDate}
          />
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Label>Summary*</Form.Label>
        <Form.Control
          type="text"
          name="workSummary"
          onChange={(e) => updateVolunteeringData(index, "summary", e.target.value)}
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
            updateVolunteeringData(
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
        <Button variant="danger" onClick={() => handleRemoveVolunteering(index)}>
          Remove
        </Button>
      </div>
      <hr />
    </div>
  );
};

VolunteerFormComponent.propTypes = {
  index: PropTypes.number,
  data: PropTypes.exact({
    organization: PropTypes.string,
    position: PropTypes.string,
    website: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    summary: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }),
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default VolunteerFormComponent;
