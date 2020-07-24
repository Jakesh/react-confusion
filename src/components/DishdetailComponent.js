import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb} from 'reactstrap';
import {Link} from 'react-router-dom';

    function RenderDish({dish}){
        return(
        <Card>
            <CardImg width="80%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
        </Card>
        );
    }
    function RenderComments({comments}){
        if(comments != null){
           return(
                <Card>
                    <CardTitle>Comments:</CardTitle>
                    <CardBody>{comments.map((sub) => <ul className="list-unstyled"><li>{sub.comment}<p>--{sub.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(sub.date)))}</p></li></ul>)}</CardBody>
                </Card>
            );  
        }
        else{
            return(<div></div>);
        }
       
    }


        
    const DishDetails=(props) =>{
        if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}/>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }

   

export default DishDetails;