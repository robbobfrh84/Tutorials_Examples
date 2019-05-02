import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Button, Alert } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'

import './styles.css'

function App() {

  const [showButton, setShowButton] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  return (

    <Container style={{ paddingTop: '2rem' }}>

      {showButton && (
        <Button
          onClick={() => setShowMessage(true)}
          size="lg"
        >
          Show Message
        </Button>
      )}

      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <Alert
          variant="primary"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          <Alert.Heading>
            Animated alert message
          </Alert.Heading>
          <p>
            This alert message is being transitioned in and
            out of the DOM.
          </p>
          <Button onClick={() => setShowMessage(false)}>
            Close
          </Button>
        </Alert>
      </CSSTransition>

    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root') )
