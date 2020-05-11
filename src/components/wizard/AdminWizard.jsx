import React, { useState } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import Users from '../users/Users';
import Departments from '../department/Departments';
import CreateTemplate from '../list/CreateTemplate';
import List from '../list/List';

const AdminWizard = () => {
  const [step, setStep] = useState(1);
  const [listId, setListId] = useState(null);
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const content = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Modal.Content>
              <Users wizard />
            </Modal.Content>

            <Modal.Actions>
              <Button onClick={() => handleBack()}>Back</Button>
              <Button positive onClick={() => handleNext()}>
                Next
              </Button>
            </Modal.Actions>
          </>
        );
      case 2:
        return (
          <>
            <Modal.Content>
              <Departments wizard />
            </Modal.Content>

            <Modal.Actions>
              <Button onClick={() => handleBack()}>Back</Button>
              <Button positive onClick={() => handleNext()}>
                Next
              </Button>
            </Modal.Actions>
          </>
        );
      case 3:
        return (
          <>
            <Modal.Content>
              <CreateTemplate setStep={setStep} setListId={setListId} />
            </Modal.Content>

            <Modal.Actions>
              <Button onClick={() => handleBack()}>Back</Button>
            </Modal.Actions>
          </>
        );
      case 4:
        return (
          <>
            <Modal.Content>
              <List listId={listId} wizard />
            </Modal.Content>

            <Modal.Actions>
              <Button onClick={() => handleBack()}>Back</Button>
              <Button positive onClick={() => handleNext()}>
                Next
              </Button>
            </Modal.Actions>
          </>
        );
      case 5:
        return (
          <>
            <Modal.Content>
              <Modal.Description
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
              >
                <Icon size="huge" name="check" large={1} />
                <p>
                  You have now created the necessary templates to enjoy the base
                  functionality of the app.
                  <br /> All users can now create new employee lists that are
                  based on templates.
                  <br />
                  Click anywhere outside of this box to close it.
                </p>
              </Modal.Description>
            </Modal.Content>
          </>
        );

      default:
        break;
    }
  };
  return <Modal trigger={<Button>Start Wizard</Button>}>{content()}</Modal>;
};

export default AdminWizard;
