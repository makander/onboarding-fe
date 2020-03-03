import { Link } from '@reach/router';
import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ');

const DisplayCard = ({
  description, name, id, type,
}) => (
  <Card>
    <Card.Content header={name} />
    <Card.Content description={description} />
    <Card.Content extra>
      <Link to="list/:id">
        View
        {' '}
        {type}
        {' '}
      </Link>
    </Card.Content>
  </Card>
);

export default DisplayCard;
