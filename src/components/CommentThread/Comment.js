import React , {useState} from 'react';
import './comment.css';

function CommentBox() {
    const [com,setCom]= useState({
        showComments: true,
        comments: [
          {id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick"},
          {id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow..."},
          {id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
        ]
    })
    
/*
{
    showComments: boolean;
    comments: {
        id: number;
        author: string;
        body: string;
    }[];
*/ 

        {
      const comments = getComments();
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (true) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <h2>Join the Discussion!</h2>
          <CommentForm addComment={addComment}/>
          <button id="comment-reveal" onClick={handleClick}>
            {buttonText}
          </button>
          <h3>Comments</h3>
          <h4 className="comment-count">
            {()=>{getCommentsTitle()}}
          </h4>
          {commentNodes}
        </div>  
      );
    } // end render
    
    function addComment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        author,
        body
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); 
    }
    
    function handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    function getComments() {    
      return this.state.comments.map((comment) => { 
        return (
          <Comment 
            author={comment.author} 
            body={comment.body} 
            key={comment.id} />
        ); 
      });
    }
    
    function getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } // end CommentBox component
  
  function CommentForm() {
    

        const [name,setName]=useState('');

      return (
        <form className="comment-form" onSubmit={(event=>{handleSubmit(event)})}>
          <div className="comment-form-fields">
            <input placeholder="Name" required ref={(input) => this._author = input}></input><br />
            <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
            <button type="submit">Post Comment</button>
          </div>
        </form>
      );
     // end render
    
    function handleSubmit(event) { 
      event.preventDefault();   // prevents page from reloading on submit
      let author = this._author;
      let body = this._body;
      this.props.addComment(author.value, body.value);
    }
  } // end CommentForm component
  
  function Comment(){
      return(
        <div className="comment">
          <p className="comment-header">{this.props.author}</p>
          <p className="comment-body">- {this.props.body}</p>
          
        </div>
      );
    
    /*_deleteComment() {
      alert("-- DELETE Comment Functionality COMMING SOON...");
    }*/
  }
  
  
  
  export default CommentBox;