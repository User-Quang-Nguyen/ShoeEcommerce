import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

// export const users = [...Array(24)].map((_, index) => ({
//   id: faker.string.uuid(),
//   avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
//   name: faker.person.fullName(),
//   company: faker.company.name(),
//   isVerified: faker.datatype.boolean(),
//   status: sample(['active', 'banned']),
//   role: sample([
//     'Leader',
//     'Hr Manager',
//     'UI Designer',
//     'UX Designer',
//     'UI/UX Designer',
//     'Project Manager',
//     'Backend Developer',
//     'Full Stack Designer',
//     'Front End Developer',
//     'Full Stack Developer',
//   ]),
// }));

export const users =
  [{
    "id": 1,
    "name": "Quang Nguyen",
    "email": "admin@admin.com",
    "phonenumber": "0326961431",
    "address": "Hoằng Trạch, Hoằng Hóa, Thanh Hóa",
    "gender": 0,
    "role": 1,
    "createdat": "2024-05-25T12:36:22.590Z",
    "isdeleted": false
  }, {
    "id": 2,
    "name": "test test01",
    "email": "test@gmail.com",
    "phonenumber": "0326961431",
    "address": "Hà Nội",
    "gender": 1,
    "role": 0,
    "createdat": "2024-05-27T17:03:14.974Z",
    "isdeleted": true
  }, {
    "id": 3,
    "name": "test test01",
    "email": "test@gmail.com",
    "phonenumber": "",
    "address": "",
    "gender": null,
    "role": 0,
    "createdat": "2024-05-27T17:03:14.974Z",
    "isdeleted": false
  }, {
    "id": 4,
    "name": "test test01",
    "email": "test@gmail.com",
    "phonenumber": "",
    "address": "",
    "gender": null,
    "role": 0,
    "createdat": "2024-05-27T17:03:14.974Z",
    "isdeleted": false
  }, {
    "id": 5,
    "name": "test test01",
    "email": "test@gmail.com",
    "phonenumber": "",
    "address": "",
    "gender": null,
    "role": 0,
    "createdat": "2024-05-27T17:03:14.974Z",
    "isdeleted": false
  }]