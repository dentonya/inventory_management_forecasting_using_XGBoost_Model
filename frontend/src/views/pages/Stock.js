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
  
  class Stock extends Component {
     state = {
    data: []
  }

  componentDidMount() {
     fetch(' http://127.0.0.1:8000/view_stock/')
        .then(response=>response.json())
        .then((data)=>{
          this.setState({
            data:data

          });
    });

  }
    render() {
       const stockData=this.state.data;
        const rows=stockData.map((stock)=>
         <tr key ={stock.id}>
                    <td>{stock.id}</td>
                    <td>{stock.product_code}</td>
                    <td>{stock.warehouse}</td>
                    <td>{stock.order}</td>
                    <td>{stock.date}</td>


                  </tr>

    );

      return (
          <>
            <Header/>
            {/* Page content */}
            <Container className="mt--7" fluid>
              {/* Table */}
              <Row>
                <div className="col">
                  <Card className="bg-default shadow">
                    <CardHeader className="bg-transparent border-0">
                      <h3 className="text-white mb-0">Inventory Data</h3>
                    </CardHeader>
                    <Table className="align-items-center  table-dark table-flush" responsive>
                      <thead className="thead-dark">
                      <tr>
                        <th scope="col">S/No</th>
                        <th scope="col">Product_Code</th>
                        <th scope="col">Warehouse</th>
                        <th scope="col">Order</th>
                        <th scope="col">Order_Date</th>
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
  
  export default Stock;
  