import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import CreateScoreCell from './createScoreCell';
import CreateTotalCell from './createTotalCell';

// Puts together the parts that make up a student row on the score table
// Handles logic for showing or hiding level rows
class CreateScoreRow extends Component {

// Hides and shows the levels rows
  showDetailedScores = () => {
    this.props.showLevels(this.props.student.id)
  }

  hideDetailedScores = () => {
    this.props.hideLevels()
  }

// functional components for creating category or level rows
  CreateCategoryRow = (props) => {
    const icons = this.props.icons
    return(
      <tr onClick={ props.levelsHidden ? this.showDetailedScores : this.hideDetailedScores }>
        <th scope="row">{props.student.name}</th>
        {props.categories.map((category) => (
          <CreateScoreCell
            student={props.student}
            category={category}
            levelsHidden={props.levelsHidden}
            testEnd={this.props.testEnd}
          />
        ))}
        <CreateTotalCell
          student={props.student}
          categories={props.categories}
        />
        { props.allowMessages ? (
          <td>
           {icons.map((icon) => (
              <StudentMessageButtons
                student={this.props.student}
                sendMessage={this.props.sendMessage}
                icon={icon}
              />
            ))}
           </td>
        ) : ( null )}
      </tr>
    )
  }

  CreateLevelRows = (props) => {
    return (
      <React.Fragment>
      {props.levels.map((level) => (
        <tr>
          <td> Level {level} </td>
            {props.categories.map((category) => (
              <CreateScoreCell
                student={props.student}
                level={level}
                category={category}
                testEnd={this.props.testEnd}
              />
            ))}
          <CreateTotalCell
            student={props.student}
            level={level}
            categories={props.categories}
          />
        </tr>
      ))}
      </React.Fragment>
    )
  }


  render = () => {
    const student = this.props.student
    const levels = this.props.levels
    const categories = this.props.categories

    if (this.props.selectedStudent === student.id && this.props.testEnd) {
      return (
        <React.Fragment>
          <this.CreateCategoryRow
            student={student}
            categories={categories}
          />
          <this.CreateLevelRows
            student={student}
            categories={categories}
            levels={levels}
          />
        </React.Fragment>
      )
    } else if (this.props.testEnd) {
      return (
        <this.CreateCategoryRow
          student={student}
          categories={categories}
          levelsHidden="true"
        />
      )
    } else if (this.props.selectedStudent === student.id) {
      return (
        <React.Fragment>
          <this.CreateCategoryRow
            student={student}
            categories={categories}
            allowMessages="true"
          />
          <this.CreateLevelRows
            student={student}
            categories={categories}
            levels={levels}
          />
        </React.Fragment>
      )
    } else {
      return (
        <this.CreateCategoryRow
          student={student}
          categories={categories}
          levelsHidden="true"
          allowMessages="true"
        />
      )
    }
  }

}

export default CreateScoreRow;