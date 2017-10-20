import React from "react";

//in case of delete of campus or student, indexes always start at 1
export const keepIdsInOrder = arr => {
  let id = 1,
    len = arr.length + 1,
    mapJoinArr = arr.map(campus => String(campus.id)).join(),
    regexTestStr = "," + mapJoinArr + ",";

  for (let i = 1, regexPattern, regEx; i <= len; i++) {
    regexPattern = "," + i + ",";
    regEx = new RegExp(regexPattern);
    if (!regEx.test(regexTestStr)) {
      id = i;
      i = len;
    }
  }
  return id;
};

//grab a specific campus based on student campusId
export const grabCampus = (campuses, campusId) => {
  const getCampus = campuses.filter(campus => {
    return campus.id === campusId;
  });
  const campus = getCampus[0];
  if (!campus) return [];
  return campus;
};

//checks images in each form if valid
export const validImage = image => {
  return /\.(gif|jpg|jpeg|tiff|png)$/i.test(image);
};

//creates options for campuses
export const createCampusOptions = campuses => {
  const campusOptions = campuses.map(campus => {
    return (
      <option key={campus.id} value={campus.id}>
        {campus.name}
      </option>
    );
  });
  return campusOptions;
};
