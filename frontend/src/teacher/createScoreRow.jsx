import React, { Component } from 'react';
import StudentMessageButtons from './studentMessageButtons';
import CreateScoreCell from './createScoreCell';
import CreateTotalCell from './createTotalCell';

// Puts together the parts that make up a row on the score table
class CreateScoreRow extends Component {

// Hides and shows the levels score table
  showDetailedScores = () => {
    this.props.showLevels(this.props.student.id)
  }

  hideDetailedScores = () => {
    this.props.hideLevels()
  }




  CreateCategoryRow = (props) => {
    const icons = this.props.icons
    return(
      <tr onClick={ props.levelsHidden ? this.showDetailedScores : this.hideDetailedScores }>
        <th scope="row">{props.student.name}</th>
        {props.categories.map((category) => (
          <CreateScoreCell
            student={props.student}
            category={category}
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