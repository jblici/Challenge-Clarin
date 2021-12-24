import React from 'react';
import { Container } from 'react-bootstrap';

const Vs = ({web1, web2}) => {
    return (
        <Container className="mt-4 containerBottom">
        <div className="row">
          <div className="col">
            <p className="bold">Website: {web1[0]}</p>
            <table className="table table-striped table-dark">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Speed Index</th>
                  <th scope="col">Time to Interactive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{web1[1]}</td>
                  <td>{web1[2]}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col">
            <p>Website: {web2[0]}</p>
            <table className="table table-striped table-dark">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Speed Index</th>
                  <th scope="col">Time to Interactive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>{web2[1]}</td>
                <td>{web2[2]}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </Container>
    );
}

export default Vs;