import React from "react"
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import ExerciseEditModal from "./edit-modal"
import { SearchOutlined } from "@ant-design/icons"

class Exercises extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      searchedColumn: '',
      selectedExercise: undefined,
      exercises: this.props.exercises
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  clearSelectedExercise = (exercise, remove = false) => {
    let updatedExercises = this.state.exercises
    if (exercise) {
      if (remove) {
        updatedExercises = this.state.exercises.filter(item => item.id !== exercise)
      } else {
        updatedExercises = this.state.exercises.map((el) => {
          if (el.id === exercise.id) {
            el = exercise
          }
          return el
        })
      }
    }

    this.setState({ selectedExercise: undefined, exercises: updatedExercises})
  }

  setSelectedExercise = (record) => {
    console.log(record)
    this.setState({ selectedExercise: record })
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
        render: (text, record) => <a onClick={() => this.setSelectedExercise(record)}>{record.name}</a>
      },
      {
        title: 'Sets',
        dataIndex: 'sets',
        key: 'sets',
        width: '10%',
      },
      {
        title: 'Reps',
        dataIndex: 'reps',
        key: 'reps',
        width: '10%',
      },
      {
        title: 'Timer',
        dataIndex: 'timer',
        key: 'timer',
        width: '10%',
      },
    ];

    return (
      <div className="container">
        {this.state.selectedExercise && <ExerciseEditModal exercise={this.state.selectedExercise} hideExerciseEdit={this.clearSelectedExercise} />}
        <Table
          columns={columns}
          dataSource={this.state.exercises}
          pagination={{ defaultPageSize: 50, hideOnSinglePage: true }} />
      </div>
    )
  }
}

export default Exercises
