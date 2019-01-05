import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import CreateScoreTable from './createScoreTable';
import CreateSummaryTable from './createSummaryTable';

class StudentStatsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStudent: null,
           categories: [ 1, 2, 3, 4 ],
               levels: [ 2, 1, 0 ]
      }
  }


  showTestScores = (studentID) => {
    this.setState({ selectedStudent: studentID })
  }

  hideTestScores = () => {
    this.setState({ selectedStudent: null })
  }

// Icons can be changed based on that array, the larger the
// array, the more buttons
  makeScoreTable = (student) => {
    const icons = ["👏", "🧠", "💯", "👍", "🐳"]
      return (
        <CreateScoreTable
          student={student}
          sendMessage={this.props.sendMessage}
          icons={icons}
          selectedStudent={this.state.selectedStudent}
          showLevels={this.showTestScores}
          hideLevels={this.hideTestScores}
          levels={this.state.levels}
          categories={this.state.categories}
          testEnd={this.props.testEnd}
        />
      )
  }


  render = () => {

    const scoreTable = this.props.students.map((student) =>
      this.makeScoreTable(student)
    );

    if (this.props.testEnd) {
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
            </tr>
          </thead>
          <CreateSummaryTable
            levels={this.state.levels}
            categories={this.state.categories}
            students={this.props.students}
            selectedStudent={this.state.selectedStudent}
            showLevels={this.showTestScores}
            hideLevels={this.hideTestScores}
          />
          {scoreTable}
        </table>
      )
    } else {
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
}

export default StudentStatsTable;