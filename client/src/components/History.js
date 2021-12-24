import React from 'react';
import { Container } from 'react-bootstrap';

const History = ({history}) => {

    const display = (e) => {
        const style = document.getElementById('history').style.display;
        if(style === 'block') return document.getElementById('history').style.display = 'none'
        return document.getElementById('history').style.display = "block"
    }

    return (
        <Container className='mt-3 '>
        <button className='btn btn-outline-info' onClick={display}>
            <h1><em>Historial</em></h1>
        </button>
        <div id='history'>
            {history && history.map(vs => (
                <div className="row containerBottom mt-3" key={vs.id}>
                    <div className="col">
                        <p className="bold">Website: {vs.url_1}</p>
                        <table className="table table-striped table-dark">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Speed Index</th>
                                <th scope="col">Time to Interactive</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{vs.speed_1}</td>
                                <td>{vs.time_1}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="col">
                        <p>Website: {vs.url_2}</p>
                        <table className="table table-striped table-dark">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Speed Index</th>
                                <th scope="col">Time to Interactive</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>{vs.speed_2}</td>
                            <td>{vs.time_2}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            </div>
      </Container>
    );
}

export default History;