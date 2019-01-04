import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import ShowScoreTable from './showScoreTable';

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
  makeTestGrader = (student) => {
    const icons = ["👏", "🧠", "💯", "👍", "🐳"]
    return (
      <ShowScoreTable
        student={student}
        sendMessage={this.props.sendMessage}
        icons={icons}
        selectedStudent={this.state.selectedStudent}
        showLevels={this.showTestScores}
        hideLevels={this.hideTestScores}
      />
    )
  }


  render = () => {

    const studentStats = this.props.students.map((student) =>
      this.makeTestGrader(student)
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
        {studentStats}
      </table>
    )
  }
}

export default StudentStatsTable;