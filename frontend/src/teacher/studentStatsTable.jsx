import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import CreateScoreTable from './createScoreTable';

class StudentStatsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedStudent: null }
  }


  showTestScores = (studentID) => {
    this.setState({ selectedStudent: studentID })
  }

  hideTestScores = () => {
    this.setState({ selectedStudent: null })
  }

// Icons can be changed based on that array, the larger the
// array, the more buttons
// Levels and Categories are the same, can be set by the teacher
// later on if necessary
  makeScoreTable = (student) => {
    const icons = ["👏", "🧠", "💯", "👍", "🐳"]
    const levels = [ 2, 1, 0 ]
    const categories = [ 1, 2, 3, 4 ]
      return (
        <CreateScoreTable
          student={student}
          sendMessage={this.props.sendMessage}
          icons={icons}
          selectedStudent={this.state.selectedStudent}
          showLevels={this.showTestScores}
          hideLevels={this.hideTestScores}
          levels={levels}
          categories={categories}
        />
      )
  }


  render = () => {

    const scoreTable = this.props.students.map((student) =>
      this.makeScoreTable(student)
    );

    return (
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col"> Name </th>
          <th scope="col"> Exponents </th>
          <th scope="col"> Fractions </th>
          <th scope="col"> BEDMAS </th>
          <th scope="col"> Algebra </th>
          <th scope="col"> Total </th>
          <th scope="col"> Message </th>
        </tr>
        </thead>
        {scoreTable}
      </table>
    )
  }
}

export default StudentStatsTable;