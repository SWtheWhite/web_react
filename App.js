import React, {Component} from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state={
      mode:'read',
      selected_content_id:2,
      subject:{title:"WEB", sub:"World Wide Web!"},
      welcome:{title:'Welcome', des:"Hello, React!!!"},
      contents:[
        {id:1, title:"HTML", des:"HTML is for information"},
        {id:2, title:"CSS", des:"CSS is for design"},
        {id:3, title:"JavaScript", des:"JavaScript is for interactive"}
      ]
    }
  }
  render() {
    var _title, _des, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _des = this.state.welcome.des;
      _article = <ReadContent title={_title} des={_des}></ReadContent> 
    }else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _des = data.des;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} des={_des}></ReadContent> 
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _des){
        //add content to this.state.contents
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title,des:_des}
        )
        this.setState({
          contents:_contents
        });
      }.bind(this)}></CreateContent> 
    }
    return (
      <div className="App">
      <Subject
        title={this.state.subject.title}
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
      >
      </Subject>
      <TOC onChangePage={function(id){
        this.setState({
          mode:'read',
          selected_content_id:Number(id)
        });
      }.bind(this)}
      data={this.state.contents}
      >
      </TOC>
      <Control onChangeMode={function(_mode){
        this.setState({
          mode:_mode
        });
      }.bind(this)}></Control>
      {_article}
      </div>
    );
  }
}

export default App;