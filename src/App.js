import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Input,
  Button,
  Icon,
  List,
  Popover,
  Row,
  Col,
} from 'antd';
import store from './store/';

class App extends Component {

  constructor(props) {
    super(props);
    // 来数据啦~\(≧▽≦)/~啦啦啦
    this.state = store.getState();
    store.subscribe(this.dataRefresh.bind(this));
    this.dataRefresh = this.dataRefresh.bind(this);
    this.newEvent = this.newEvent.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  render(){
    return (
      <div className="container" style={{width:'800px',margin:'90px auto'}}>
        <center><h1 style={{margin:'30px 0'}}>Todo List</h1></center>
        <div style={{margin:'30px 0'}}>
          <Input placeholder='Anything new?' allowClear size='large'
            value={this.state.event}
            onChange={this.newEvent}
            style={{width:'750px',textAlign:'center'}} />
          <Button size='large' type='primary' onClick={this.addTodo}>
            <Icon type='plus' />
          </Button>
        </div>
        <div style={{width:'398px',float:'left',borderRight:'2px solid #fff'}}>
          <Row>
            <List
              header={<center><h2><b>Todo</b></h2></center>}
              dataSource={this.state.todos}
              renderItem={(item,index) => (
                <List.Item>
                        <Col span={12}>
                          {item}
                        </Col>
                        <Col span={6} offset={6}>
                          <Popover content={'Give Up'}>
                            <Icon type='close' onClick={this.giveUp.bind(this,index)} />
                          </Popover>
                          <Popover content={'Done'}>
                            <Icon type='check' onClick={this.done.bind(this,index)} />
                          </Popover>
                        </Col>

                </List.Item>
              )}
            />
          </Row>
        </div>
        <div style={{width:'398px',float:'left',borderLeft:'2px solid #fff'}}>
          <Row>
            <List
              header={<center><h2><b>Done</b></h2></center>}
              dataSource={this.state.dones}
              renderItem={(item,index) => (
                <List.Item>
                        <Col span={12}>
                          {item}
                        </Col>
                        <Col span={6} offset={6}>
                          <Popover content={'Delete it'}>
                            <Icon type='close' onClick={this.delete.bind(this,index)} />
                          </Popover>
                          <Popover content={'Undo'}>
                            <Icon type='rollback' onClick={this.undo.bind(this,index)} />
                          </Popover>
                        </Col>

                </List.Item>
              )}
            />
          </Row>
        </div>
      </div>
    );
  }

  dataRefresh(){
    this.setState(store.getState());
  }

  newEvent(e){
    const action = {
      type : 'newEvent',
      value : e.target.value
    }
    store.dispatch(action);
  }

  addTodo(){
    const action = {
      type : 'addTodo',
    }
    store.dispatch(action);
  }

  giveUp(index){
    const action = {
      type: 'giveup',
      index
    }
    store.dispatch(action);
  }

  done(index){
    const action = {
      type: 'done',
      index
    }
    store.dispatch(action);
  }

  undo(index){
    const action = {
      type : 'undo',
      index
    }
    store.dispatch(action);
  }

  delete(index){
    const action = {
      type : 'delete',
      index
    }
    store.dispatch(action);
  }

}


export default App;
