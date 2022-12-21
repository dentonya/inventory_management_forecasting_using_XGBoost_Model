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
  
  class Demand extends Component {
    state = {
      data: []
    }

    componentDidMount() {
      fetch(' http://127.0.0.1:8000/view_demand/')
          .then(response => response.json())
          .then((data) => {
            this.setState({
              data: data

            });
          });

    }

    render() {
      const demandData = this.state.data;
      const rows = demandData.map((demand) =>
          <tr key={demand.id}>
            <td>{demand.id}</td>
            <td>{demand.Date}</td>
            <td>{demand.Warehouse}</td>
            <td>{demand.Product_Code}</td>
            <td>{demand.Product_Category}</td>
              <td>{demand.Order_Demand}</td>



          </tr>
      );
      return (
          <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
              {/* Table */}
              <Row className="mt-5">
                <div className="col">
                  <Card className="bg-default shadow">
                    <CardHeader className="bg-transparent border-0">
                      <h3 className="text-white mb-0">Product Demand</h3>
                    </CardHeader>
                    <Table className="align-items-center table-dark table-flush" responsive>
                      <thead className="thead-dark">
                      <tr>
                        <th scope="col">S/No</th>
                          <th scope="col">Date</th>
                          <th scope="col">Warehouse</th>
                        <th scope="col">Product_Code</th>
                        <th scope="col">Product_Category</th>
                        <th scope="col">Demand</th>

                        <th scope="col"/>


                      </tr>
                      </thead>
                      <tbody>
                      {rows}
                      </tbody>
                    </Table>
                    <CardFooter className="py-4">
                      <nav aria-label="...">
                        <Pagination
                            className="pagination justify-content-end mb-0"
                            listClassName="justify-content-end mb-0"
                        >
                          <PaginationItem className="disabled">
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                tabIndex="-1"
                            >
                              <i className="fas fa-angle-left"/>
                              <span className="sr-only">Previous</span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem className="active">
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                              2 <span className="sr-only">(current)</span>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                              3
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-angle-right"/>
                              <span className="sr-only">Next</span>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </nav>
                    </CardFooter>
                  </Card>
                </div>
              </Row>

            </Container>
          </>
      );
    };
  };
  
  export default Demand;
  