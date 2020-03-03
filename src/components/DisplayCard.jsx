import { Link } from '@reach/router';
import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


const DisplayCard = ({
  history, description, name, id, type,
}) => (
  <Card>
    <Card.Content header={name} />
    <Card.Content description={description} />
    <Card.Content extra>

      <Link to={`${id}`}>
        View
        {' '}
        {type}
        {' '}
      </Link>
    </Card.Content>
  </Card>
);

export default DisplayCard;
