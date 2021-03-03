const Staff = require('../../models/staff');

// create new
exports.addNewStaff = function (data) {
  return new Promise((resolve, reject) => {
    let newStaff = new Staff(data);
    newStaff.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`new staff (id: ${newStaff._id}) is created.`);
      }
    });
  });
};

// view all
exports.viewAllStaff = function () {
  return new Promise((resolve, reject) => {
    Staff.find()
      .populate({path: 'account'})
      .populate({
        path: 'workSchedules',
        populate: [{ path: 'date'},{ path: 'times'}]
      })
      .then((staff) => {
        resolve(staff);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// view one
exports.viewStaffById = function (id) {
  return new Promise((resolve, reject) => {
    Staff.findOne({ _id: id })
      .exec()
      .then((staff) => {
        resolve(staff);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// update one
exports.editStaffById = function (data, id) {
  return new Promise((resolve, reject) => {
    Staff.updateOne(
      { _id: id },
      {
        $set: data,
      }
    )
      .exec()
      .then(() => {
        resolve(`Staff (id: ${id}) is updated`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// delete one
exports.deleteStaffById = function (id) {
  return new Promise((resolve, reject) => {
    Staff.deleteOne({ _id: id })
      .exec()
      .then(() => {
        resolve(`Staff (id: ${id}) is deleted`);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
