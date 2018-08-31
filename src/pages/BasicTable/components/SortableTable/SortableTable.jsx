import React, { Component } from 'react';
import axios from 'axios';

import IceContainer from '@icedesign/container';
import { Table, Icon, Button } from '@icedesign/base';


export default class SortableTable extends Component {
  static displayName = 'SortableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    // 使用 axios 获取数据
    axios('https://jsonplaceholder.typicode.com/todos').then((response) => {
      this.setState({
        dataSource: response.data.map((item, index) => {
          console.log(item);
          return {
            todo: `${item.userId}`,
            memo: `${item.title}`,
            validity: `${item.completed}`

          };
        }),
      });
    });
  }


  moveUp = (index) => {
    if (index > 0) {
      const dataSource = this.state.dataSource;
      const prevItem = dataSource[index - 1];
      const currentItem = dataSource[index];
      dataSource.splice(index - 1, 2, currentItem, prevItem);
      this.setState({
        dataSource,
      });
    }
  };

  moveDown = (index) => {
    if (index < this.state.dataSource.length - 1) {
      const dataSource = this.state.dataSource;
      const currentItem = dataSource[index];
      const nextItem = dataSource[index + 1];
      dataSource.splice(index, 2, nextItem, currentItem);
      this.setState({
        dataSource,
      });
    }
  };

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  renderSortButton = (value, index) => {
    return (
      <div>
        <Button
          onClick={this.moveDown.bind(this, index)}
          size="large"
          shape="text"
          disabled={index === this.state.dataSource.length - 1}
        >
          <Icon title="下移" type="descending" />
        </Button>
        <Button
          onClick={this.moveUp.bind(this, index)}
          size="large"
          shape="text"
          disabled={index === 0}
        >
          <Icon title="上移" type="ascending" />
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div className="sortable-table" style={styles.sortableTable}>
        <IceContainer>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={80} title="顺序" cell={this.renderOrder} />
            <Table.Column width={280} title="待办人id" dataIndex="todo" />
            <Table.Column width={240} title="备注" dataIndex="memo" />
            <Table.Column width={180} title="是否完成" dataIndex="validity" />
            <Table.Column
              width={80}
              title="排序"
              cell={this.renderSortButton}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  sortableTable: {},
};
