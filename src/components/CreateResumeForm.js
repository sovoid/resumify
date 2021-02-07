import { Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Card, Col, Alert, Tabs, Tab } from "react-bootstrap";
import _ from "lodash";
import initialFormData from "./data/resume";
import AwardFormComponent from "./AwardFormComponent";
import EducationFormComponent from "./EducationFormComponent";
import LanguageFormComponent from "./LanguageFormComponent";
import PublicationFormComponent from "./PublicationFormComponent";
import ReferenceFormComponent from "./ReferenceFormComponent";
import SkillFormComponent from "./SkillFormComponent";
import ThemeFormComponent from "./ThemeFormComponent";
import VolunteerFormComponent from "./VolunteerFormComponent";
import WorkFormComponent from "./WorkFormComponent";

import { listResumes } from "../graphql/queries";
import { createResume, updateResume } from "../graphql/mutations";

const CreateResumeForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(``);

  useEffect(() => {
    const fetchResume = async () => {
      // Get username of the current authenticated user
      const { username } = await Auth.currentAuthenticatedUser();

      try {
        // Fetch existing resume data for current authenticated user
        const resumeData = await API.graphql(graphqlOperation(listResumes), {
          filter: { owner: username },
          limit: 1,
        });

        // If it exists, use that data for initial form else use the default initial value
        if (resumeData.data.listResumes.items.length) {
          const fetchedFormData = resumeData.data.listResumes.items[0];
          setFormData(fetchedFormData);
          toast("🎊 Restored details from database!");
        }
      } catch (err) {
        toast.error("😢 Error restoring details from database!");
      }
    };

    fetchResume();
  }, []);

  /**
   *
   * @param {String} objectPath Path to the nested object key
   * @param {String} value New Value
   */
  const updateFormData = (objectPath, value) => {
    setFormData({
      ..._.set(formData, objectPath, value),
    });
  };

  const handleAddWork = () => {
    formData.work = _.concat(formData.work, {
      company: "",
      position: "",
      website: "",
      startDate: "",
      endDate: "",
      summary: "",
      highlights: [],
    });
    setFormData({
      ...formData,
      work: formData.work,
    });
  };

  const handleAddVolunteering = () => {
    formData.volunteer = _.concat(formData.volunteer, {
      organization: "",
      position: "",
      website: "",
      startDate: "",
      endDate: "",
      summary: "",
      highlights: [],
    });
    setFormData({
      ...formData,
      volunteer: formData.volunteer,
    });
  };

  const handleAddEducation = () => {
    formData.education = _.concat(formData.education, {
      institution: "",
      area: "",
      studyType: "",
      startDate: "",
      endDate: "",
      gpa: "3",
      courses: [],
    });
    setFormData({
      ...formData,
      education: formData.education,
    });
  };

  const handleAddAward = () => {
    formData.awards = _.concat(formData.awards, {
      title: "",
      date: "",
      awarder: "",
      summary: "",
    });
    setFormData({
      ...formData,
      awards: formData.awards,
    });
  };

  const handleAddSkill = () => {
    formData.skills = _.concat(formData.skills, {
      name: "",
      level: "Master",
      keywords: [],
    });
    setFormData({
      ...formData,
      skills: formData.skills,
    });
  };

  const handleAddLanguage = () => {
    formData.languages = _.concat(formData.languages, {
      language: "",
      fluency: "Fluent",
    });
    setFormData({
      ...formData,
      languages: formData.languages,
    });
  };

  const handleAddPublication = () => {
    formData.publications = _.concat(formData.publications, {
      name: "",
      publisher: "",
      website: "",
      releaseDate: "",
      summary: "",
    });
    setFormData({
      ...formData,
      publications: formData.publications,
    });
  };

  const handleAddReference = () => {
    formData.references = _.concat(formData.references, {
      name: "",
      reference: "",
    });
    setFormData({
      ...formData,
      references: formData.references,
    });
  };

  const handleGenerateResume = async () => {
    // TODO Call rest api to fetch resume pdf
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:8000/`,
        data: {
          resumeData: formData,
        },
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
        },
      });
      const blob = new Blob([data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `resume.pdf`;
      link.click();
    } catch (err) {
      setError("Failed to generate PDF!");
    }
  };

  const handleSaveResume = async () => {
    // If resume is previously generated,
    // just update it
    try {
      if (formData?.id) {
        const { id, createdAt, updatedAt, owner, ...rest } = formData;

        await API.graphql(
          graphqlOperation(updateResume, {
            input: {
              id,
              ...rest,
            },
          })
        );
      } else {
        // Else create a new resume for the current user
        await API.graphql(
          graphqlOperation(createResume, {
            input: {
              ...formData,
            },
          })
        );
        toast("🥳 Saved details to database!");
      }
    } catch (err) {
      toast.error("🤷‍♂️ Failed to save details to the database!");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create new resume</h2>
          <div className="text-center">
            <Button variant="info" onClick={handleSaveResume}>
              Save
            </Button>
            {` `}
            <Button variant="dark" onClick={handleGenerateResume}>
              Generate
            </Button>
          </div>
          <ThemeFormComponent formData={formData} setFormData={setFormData} />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Tabs>
              <Tab eventKey="basics" title="Basic">
                <h3 className="mt-2">Basic Details</h3>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.basics.name}
                    onChange={(e) =>
                      updateFormData("basics.name", e.target.value)
                    }
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={formData.basics.label}
                    onChange={(e) =>
                      updateFormData("basics.label", e.target.value)
                    }
                    placeholder="e.g. Software Developer"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.basics.email}
                    onChange={(e) =>
                      updateFormData("basics.email", e.target.value)
                    }
                    placeholder="e.g. johndoe@example.com"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    name="website"
                    value={formData.basics.website}
                    onChange={(e) =>
                      updateFormData("basics.website", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.basics.phone}
                    onChange={(e) =>
                      updateFormData("basics.phone", e.target.value)
                    }
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="Format: 123-456-789"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="summary"
                    value={formData.basics.summary}
                    onChange={(e) =>
                      updateFormData("basics.summary", e.target.value)
                    }
                    placeholder="Bio"
                    required
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey="location" title="Location">
                <h3 className="mt-2">Location Details</h3>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.basics.location.address}
                    onChange={(e) =>
                      updateFormData("basics.location.address", e.target.value)
                    }
                    placeholder="e.g. 1234 Main St"
                    required
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.basics.location.city}
                      onChange={(e) =>
                        updateFormData("basics.location.city", e.target.value)
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                      type="text"
                      name="region"
                      value={formData.basics.location.region}
                      onChange={(e) =>
                        updateFormData("basics.location.region", e.target.value)
                      }
                      required
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="countryCode"
                      value={formData.basics.location.countryCode}
                      onChange={(e) =>
                        updateFormData(
                          "basics.location.countryCode",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={formData.basics.location.postalCode}
                      onChange={(e) =>
                        updateFormData(
                          "basics.location.postalCode",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>
                </Form.Row>
              </Tab>
              <Tab eventKey="work" title="Work">
                <h3 className="mt-4">Work Details</h3>
                {formData.work.map((w, idx) => (
                  <div key={idx}>
                    <WorkFormComponent
                      index={idx}
                      data={w}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button variant="outline-primary" onClick={handleAddWork}>
                  Add Work
                </Button>
              </Tab>
              <Tab eventKey="volunteer" title="Volunteer">
                <h3 className="mt-4">Volunteering Details</h3>
                {formData.volunteer.map((v, idx) => (
                  <div key={idx}>
                    <VolunteerFormComponent index={idx} data={v} />
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  onClick={handleAddVolunteering}
                >
                  Add Volunteering
                </Button>
              </Tab>
              <Tab eventKey="education" title="Education">
                <h3 className="mt-4">Education Details</h3>
                {formData.education.map((ed, idx) => (
                  <div key={idx}>
                    <EducationFormComponent
                      index={idx}
                      data={ed}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button variant="outline-primary" onClick={handleAddEducation}>
                  Add Education
                </Button>
              </Tab>
              <Tab eventKey="awards" title="Awards">
                <h3 className="mt-4">Awards Earned</h3>
                {formData.awards.map((aw, idx) => (
                  <div key={idx}>
                    <AwardFormComponent
                      index={idx}
                      data={aw}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button variant="outline-primary" onClick={handleAddAward}>
                  Add Award
                </Button>
              </Tab>
              <Tab eventKey="publications" title="Publications">
                <h3 className="mt-4">Publications</h3>
                {formData.publications.map((pb, idx) => (
                  <div key={idx}>
                    <PublicationFormComponent
                      index={idx}
                      data={pb}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  onClick={handleAddPublication}
                >
                  Add Publication
                </Button>
              </Tab>
              <Tab eventKey="skills" title="Skills">
                <h3 className="mt-4">Skills</h3>
                {formData.skills.map((sk, idx) => (
                  <div key={idx}>
                    <SkillFormComponent
                      index={idx}
                      data={sk}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button variant="outline-primary" onClick={handleAddSkill}>
                  Add Skill
                </Button>
              </Tab>
              <Tab eventKey="languages" title="Languages">
                <h3 className="mt-4">Languages</h3>
                {formData.languages.map((sk, idx) => (
                  <div key={idx}>
                    <LanguageFormComponent
                      index={idx}
                      data={sk}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button variant="outline-primary" onClick={handleAddLanguage}>
                  Add Language
                </Button>
              </Tab>
              <Tab eventKey="references" title="References">
                <h3 className="mt-4">References</h3>
                {formData.references.map((rf, idx) => (
                  <div key={idx}>
                    <ReferenceFormComponent
                      index={idx}
                      data={rf}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                ))}
                <Button variant="outline-primary" onClick={handleAddReference}>
                  Add Reference
                </Button>
              </Tab>
            </Tabs>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default withAuthenticator(CreateResumeForm);
