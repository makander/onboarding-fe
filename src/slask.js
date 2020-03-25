  <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {lists.map(((item) => item.Lists.map((list) => (
                  !list.templateList ? (<p>Please create a template list</p>)

                <Table.Row key={list.id}>
                  {list.Lists}
                  <Table.Cell>
                    <Link to={`${list.id}`}>
                      {list.name}

                    </Link>
                  </Table.Cell>
                  <Table.Cell>{list.status ? <p>Completed</p> : <p>In progress</p>}</Table.Cell>
                </Table.Row>
              ))))}
            </Table.Body>
          </Table> 