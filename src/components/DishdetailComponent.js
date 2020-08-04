import React,{ Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, Label, Input, Col, Row, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){
    return(
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
        <Card>
            <CardImg width="80%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
        </Card>
    </FadeTransform>
    );
}
 
function RenderComments ({comments, postComment, dishId}){
    if(comments != null){
       return(
            <Card>
                <CardTitle>Comments:</CardTitle>
                <CardBody>
                   <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((sub) => <Fade in><li>{sub.comment}<p>--{sub.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(sub.date)))}</p></li></Fade>)}
                        </Stagger> 
                    </ul>
                </CardBody>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </Card>       
        );  
    }
    else{
        return(<div></div>);
    }
   
}


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isCommentModalOpen: false
        };
        this.toggleCommentModal=this.toggleCommentModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    
    toggleCommentModal(){
        this.setState({
            isCommentModalOpen : !this.state.isCommentModalOpen
        });
    }

    handleSubmit(values){
        this.toggleCommentModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div>
                <Button className="col-md-5" outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-edit fa-lg"></span>Comment
                </Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                <ModalHeader toggle={this.toggleCommentModal}>Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" name="author" id="author" 
                                placeholder="Name" validators={{required, minLength: minLength(3), maxLength: maxLength(10)}} />
                                <Errors className="text-danger" model=".author" show="touched" messages={{
                                    required:'Field is Required ', minLength:'Minimum characters should be 3 ',
                                    maxLength:'Maximum length of characters should be 10'
                                }}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" name="comment" id="comment" 
                                placeholder="Name" rows="5" className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={3}>
                                <Button type="submit" color="primary">
                                Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        ); 
        }
    }


function DishDetails(props)
{
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4> 
                </div>
            </div>
        );
    }
    else if(props.dish != null){
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
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );}
    
    else{
            return(
            <div>
            </div>
        );
        }
}

   

export default DishDetails;