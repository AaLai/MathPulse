import React, { Component } from 'react';
import CreateScoreRow from './createScoreRow'

class CreateSummaryTable extends Component {

  totalCorrectAnswers = () => {
    let total = 0;
    this.props.categories.map((category) => {
      this.props.students.map((student) => {
        student[category].map((level) => {
          level.map((answer) => {
            if (answer === true) {
              total ++;
            }
          })
        })
      })
    })
    return total;
  }

  totalAnswers = () => {
    let total = 0;
    this.props.categories.map((category) => {
      this.props.students.map((student) => {
        student[category].map((level) => {
          total += level.length
        })
      })
    })
    return total;
  }

  totalCorrectAnswersByCategory = (category) => {
    let total = 0;
    this.props.students.map((student) => {
      student[category].map((level) => {
        level.map((answer) => {
          if (answer === true) {
            total ++;
          }
        })
      })
    })
    return total;
  }

  totalAnswersByCategory = (category) => {
    let total = 0;
    this.props.students.map((student) => {
      student[category].map((level) => {
        total += level.length
      })
    })
    return total;
  }

  totalCorrectAnswersByCategoryLevel = (category, level) => {
    let total = 0;
    this.props.students.map((student) => {
      student[category][level].map((answer) => {
        if (answer === true) {
          total ++;
        }
      })
    })
    return total;
  }

  totalAnswersByCategoryLevel = (category, level) => {
    let total = 0;
    this.props.students.map((student) => {
      total += student[category][level].length
    })
    return total;
  }

  totalCorrectAnswersByLevel = (level) => {
    let total = 0
    this.props.students.map((student) => {
      this.props.categories.map((category) => {
        student[category][level].map((answer) => {
          if (answer === true) {
            total ++;
          }
        })
      })
    })
    return total;
  }

  totalAnswersByLevel = (level) => {
    let total = 0
    this.props.students.map((student) => {
      this.props.categories.map((category) => {
        total += student[category][level].length
      })
    })
    return total;
  }

// Hides and shows the levels score table
  showDetailedScores = () => {
    this.props.showLevels('summary')
  }

  hideDetailedScores = () => {
    this.props.hideLevels()
  }

  render = () => {
    const students = this.props.students
    const levels = this.props.levels
    const categories = this.props.categories

    if (this.props.selectedStudent === 'summary' ) {
      return (
        <React.Fragment>
          <tr onClick={this.hideDetailedScores}>
            <th scope="row">Summary</th>
            {categories.map((category) => (
              <CreateScoreRow
                students={students}
                category={category}
                summary='true'
                totalCorrectAnswersByCategory={this.totalCorrectAnswersByCategory}
                totalAnswersByCategory={this.totalAnswersByCategory}
              />
            ))}
            <td>{this.totalCorrectAnswers()} / {this.totalAnswers()}</td>
          </tr>
          {levels.map((level) => (
            <tr>
              <td> Level {level} </td>
              {categories.map((category) => (
                <CreateScoreRow
                  students={students}
                  level={level}
                  summary='true'
                  category={category}
                  totalCorrectAnswersByCategoryLevel={this.totalCorrectAnswersByCategoryLevel}
                  totalAnswersByCategoryLevel={this.totalAnswersByCategoryLevel}
                />
              ))}
              <td>{this.totalCorrectAnswersByLevel(level)} / {this.totalAnswersByLevel(level)}</td>
            </tr>
          ))}
        </React.Fragment>
      )
    } else {
      return (
        <tr onClick={this.showDetailedScores}>
          <th scope="row">Summary</th>
          {categories.map((category) => (
            <CreateScoreRow
              students={students}
              category={category}
              summary='true'
              totalCorrectAnswersByCategory={this.totalCorrectAnswersByCategory}
              totalAnswersByCategory={this.totalAnswersByCategory}
            />
          ))}
          <td>{this.totalCorrectAnswers()} / {this.totalAnswers()}</td>
        </tr>
      )
    }
  }
}

export default CreateSummaryTable;