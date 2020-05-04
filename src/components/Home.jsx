import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  List,
  Segment,
  Grid,
  Header,
  Loader,
  Message,
} from 'semantic-ui-react';
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import DepartmentService from '../services/DepartmentService';

const Home = () => {
  const location = useLocation();
  const {
    authStatus: { user },
  } = useContext(AuthContext);
  const { dispatchMessage } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const prof = await UserService.findOne(user.id);
        const getDeps = await DepartmentService.all();

        setDepartments(getDeps);
        setProfile(prof);
      } catch (error) {
        dispatchMessage({
          type: 'ERROR',
          payload: error.response.data,
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [location.pathname]);

  return (
    <Grid.Column tablet={14} computer={12}>
      {!isLoading ? (
        <>
          <div style={{ margin: '2em 0' }}>
            <Message size="huge">
              <Header float="left" textAlign="left">
                Welcome {user.firstName} {user.lastName}
              </Header>
            </Message>
            {profile.Departments != null &&
            profile.Departments.length === 0 &&
            !profile.admin ? (
              <Message>
                {' '}
                Contact your administrator. You need to belong to a department
                before you can use the application
              </Message>
            ) : (
              <>
                <Message positive>
                  <>
                    <p>
                      To get started using the application you have to complete
                      a couple of steps.
                    </p>
                    {profile.admin ? (
                      <List bulleted>
                        <List.Item>
                          Go to departments and create a new department.
                        </List.Item>
                        <List.Item> Add users to the department</List.Item>
                        <List.Item>
                          Create a template list. For instance one called
                          onboarding. Add the departments that are involved with
                          the onboarding process.
                        </List.Item>
                        <List.Item>
                          In the newly created list, add tasks that are
                          associated with the normal onboarding proceedures.
                          Like the purchase of a computer. Then save the
                          template.
                        </List.Item>
                        <List.Item>
                          Create a new employee list and select a template from
                          the dropdown.
                        </List.Item>
                        <List.Item>
                          If you want to notify users by email or slack. Go into
                          notifications under the notifications setting. Add
                          either an e-mail address or a slack hook uri.
                        </List.Item>
                      </List>
                    ) : (
                      <List bulleted>
                        <List.Item>
                          Create a new employee list and select a template from
                          the dropdown.
                        </List.Item>
                        <List.Item>
                          In the newly created list you can do the following:
                          <List as="ol" style={{ paddingTop: '0.5em' }}>
                            <List.Item as="li" value="-">
                              Add new tasks
                            </List.Item>
                            <List.Item as="li" value="-">
                              Assign users to tasks
                            </List.Item>
                            <List.Item as="li" value="-">
                              Complete tasks and lists
                            </List.Item>
                          </List>
                        </List.Item>
                      </List>
                    )}
                  </>
                </Message>

                {profile.Tasks && profile.Tasks.length !== 0 ? (
                  <Segment>
                    <>
                      <Header>Tasks</Header>
                      <p>You are assigned to {profile.Tasks.length} tasks.</p>
                      <List>
                        {profile.Tasks.map((task) => (
                          <List.Item key={task.id}>
                            <Link to={`/lists/${task.ListId}`}>
                              {task.name}
                            </Link>
                          </List.Item>
                        ))}
                      </List>
                    </>
                  </Segment>
                ) : (
                  ''
                )}
                <Segment>
                  {!profile.admin && !profile.Departments
                    ? 'You are not assigned to a department, contact admin'
                    : profile.admin && profile.Departments.length === 0
                    ? 'You are not assigned to a department, please join or create one'
                    : ''}

                  {profile.Departments != null &&
                  profile.Departments.length !== 0 ? (
                    <>
                      <Header>Departments</Header>

                      <p>You a member of the following departments:</p>
                      <List>
                        {profile.Departments.map((department) => (
                          <List.Item key={department.id}>
                            {department.name}
                          </List.Item>
                        ))}
                      </List>
                    </>
                  ) : (
                    ''
                  )}
                </Segment>
              </>
            )}
          </div>
        </>
      ) : (
        <Segment style={{ margin: '2em 0' }}>
          <Loader active inline="centered" size="huge">
            Loading
          </Loader>
        </Segment>
      )}
    </Grid.Column>
  );
};
export default Home;
