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
      .populate('account')
      .populate({
        path: 'workSchedules',
        populate: [{ path: 'date'},{ path: 'time'}]
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
      .populate('account')
      .populate({
        path: 'workSchedules',
        populate: [{ path: 'date'},{ path: 'time'}],
      })
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

exports.viewStaffByInput = function (query) {
  return new Promise((resolve, reject) => {
    Staff.findOne(query)
      .populate('account')
      .exec()
      .then((staff) => {
        resolve(staff);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
