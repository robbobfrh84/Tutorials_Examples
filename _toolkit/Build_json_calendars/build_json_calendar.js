const fs = require('fs');

const calender = {}
const years = [ 2020, 2021, 2022, 2023, 2024 ]

years.forEach( year => {
  calender[year] = []
  for (let i = 0; i < 12; i++) {
    const daysInMonth = new Date(year,(i+1),0).getDate()
    calender[year][i] = []
    console.log(year, (i+1), daysInMonth)
    for (let j = 0; j < daysInMonth; j++) {
      calender[year][i][j] = year+'-'+(i+1)+'-'+(j+1)
    }
  }
})

// console.log("calender :", calender)

fs.writeFileSync('calender.json', JSON.stringify(calender, null, 2) )
