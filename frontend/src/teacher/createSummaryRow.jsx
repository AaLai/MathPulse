import React, { Component } from 'react';
import CreateSummaryCell from './createSummaryCell'
import CreateSummaryTotalCell from './createSummaryTotalCell'

// Combines summary cells to create a summary row
// Handles show and hide row logic
class CreateSummaryRow extends Component {


// Hides and shows the level rows
  showDetailedScores = () => {
    this.props.showLevels('summary')
  }

  hideDetailedScores = () => {
    this.props.hideLevels()
  }

// functional components to create level or category rows
  CreateSummaryCategoryRow = (props) => {
    return(
      <tr onClick={props.levelsHidden ? this.showDetailedScores : this.hideDetailedScores}>
        <th scope="row">Summary</th>
        {props.categories.map((category) => (
          <CreateSummaryCell
            students={props.students}
            category={category}
          />
        ))}
        <CreateSummaryTotalCell
          students={props.students}
          categories={props.categories}
        />
      </tr>
    )
  }

  CreateSummaryLevelRows = (props) => {
    return (
      <React.Fragment>
        {props.levels.map((level) => (
          <tr>
            <td> Level {level} </td>
            {props.categories.map((category) => (
              <CreateSummaryCell
                students={props.students}
                level={level}
                category={category}
              />
            ))}
            <CreateSummaryTotalCell
              students={props.students}
              level={level}
              categories={props.categories}
            />
          </tr>
        ))}
      </React.Fragment>
    )
  }



  render = () => {
    const students = this.props.students
    const levels = this.props.levels
    const categories = this.props.categories

    if (this.props.selectedStudent === 'summary' ) {
      return (
        <React.Fragment>
          <this.CreateSummaryCategoryRow
            categories={categories}
            students={students}
          />
          <this.CreateSummaryLevelRows
            categories={categories}
            students={students}
            levels={levels}
          />
        </React.Fragment>
      )
    } else {
      return (
        <this.CreateSummaryCategoryRow
          categories={categories}
          students={students}
          levelsHidden="true"
        />
      )
    }
  }
}

export default CreateSummaryRow;