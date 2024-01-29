import React from 'react'
import {Container , Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ContentCreatorSteps = () => {

  const contentCreatorSteps = [
    {
      desc : "Upload Documents",
      icon : <i className="fas fa-file-image"></i>,
      link : "document-upload"
    },
    {
      desc : "Admin approve the document",
      icon : <i className="fas fa-check-circle"></i>,
    },
    {
      desc : "Update billing details",
      icon : <i className="fas fa-university"></i>,
      link : "add-bank"
    },
    {
      desc : "Admin makes you creator",
      icon : <i className="fas fa-user-check"></i>,
    },
    {
      desc : "Update subscription amount",
      icon : <i className="fas fa-dollar-sign"></i>,
      link : "edit-profile"
    },
  ]

  return (
    <>
      <div className="content-creator">
        <Container>
          <h2 className="content-creator-title">Become a content creator</h2>
          <Row>
            <div className="content-creator-wrapper">
              {contentCreatorSteps.map((step , index) => (
                <div className="content-creator-steps" key={index}>
                  <div className="contnet-icon">
                  {step.icon}
                  </div>
                  {step.link ? (
                    <Link to={step.link} className="content-title">{step.desc} <i className="fas fa-info-circle ml-2"></i></Link>
                  ) : (
                    <h4 className="content-title">{step.desc}</h4>
                  )}
                </div>
              ))}
            </div>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default ContentCreatorSteps
