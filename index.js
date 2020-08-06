function createEmployeeRecord(empInfo){
  let employeeRecord = {
    firstName: empInfo[0],
    familyName: empInfo[1],
    title: empInfo[2],
    payPerHour: empInfo[3],
    timeInEvents: [],
    timeOutEvents: []  
  }
    return employeeRecord
}

function createEmployeeRecords(arrOfEmployees){
  let empRecords = arrOfEmployees.map(createEmployeeRecord)
  return empRecords
}

function createTimeInEvent(empRecord, dateTime){
  let dateSplit = dateTime.split(' ')
  empRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateSplit[1]),
      date: dateSplit[0]
  })
  return empRecord
}

function createTimeOutEvent(empRecord, dateTime){
  let dateSplit = dateTime.split(' ')
  empRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateSplit[1]),
    date: dateSplit[0]
  })
  return empRecord
}

function hoursWorkedOnDate(empRecord, date){
  let timeIn = empRecord.timeInEvents.find(time => time.date === date)
  let timeOut = empRecord.timeOutEvents.find(time => time.date === date)
  return ((timeOut.hour - timeIn.hour)/100)
}

function wagesEarnedOnDate(empRecord, date){
  return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour
}

function allWagesFor(empRecord){
  let dates = empRecord.timeInEvents.map(i => i.date)
  return dates.reduce(function(empEarnings, date){
  return empEarnings += wagesEarnedOnDate(empRecord, date)
}, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(empRecords){
  return empRecords.reduce(function(payroll, empRecord){
    return payroll += allWagesFor(empRecord)
  }, 0)
}