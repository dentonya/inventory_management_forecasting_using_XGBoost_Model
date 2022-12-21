import React,{Component} from "react";

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

class Predictions extends Component {
     state = {
    data: []
  }

  componentDidMount() {
     fetch(' http://127.0.0.1:8000/view_prediction/')
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            data:data

          });
    });

  }
  render() {
       const predictData=this.state.data;
        const rows=predictData.map((predict)=>
         <tr key ={predict.id}>
                    <td>{predict.id}</td>
                    <td>{predict.product_code}</td>
                    <td>{predict.warehouse}</td>
                    <td>{predict.predictions}</td>


                  </tr>

    );
    return (
        <>
          <Header/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            {/* Table */}
            <Row className="mt-3">
              <div className="col">
                <Card className="bg-default shadow">
                  <CardHeader className="bg-transparent border-0">
                    <h3 className="text-white mb-0">Demand Predictions</h3>
                  </CardHeader>
                  <Table
                      className="align-items-center table-dark table-flush"
                      responsive
                  >
                    <thead className="thead-dark">
                    <tr>
                      <th scope="col">S/No</th>
                      <th scope="col">Product_Code</th>
                      <th scope="col">Warehouse</th>
                      <th scope="col">Predictions</th>
                      <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}

                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Container>
        </>
    );
  };
};
export default Predictions;
