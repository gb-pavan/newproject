import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { IAddTask } from '@/interfaces/addTask.interface';
import { FormField } from '@/interfaces/form.interface';

// {
//     "appointment": [
//         {
//             "_id": "67d50b3e50051717a4c3658e",
//             "name": "meeting"
//         },
//         {
//             "_id": "67d50b5650051717a4c36591",
//             "name": "demo session"
//         },
//     ],
//     "todo": [
//         {
//             "_id": "67d50a6550051717a4c36585",
//             "name": "folluo up"
//         },
//         {
//             "_id": "67d50afb50051717a4c36588",
//             "name": "send email"
//         },
// ]
// }

// {
//     "_id": "67c84485ce78280e8565ea3e",
//     "name": "John H",
//     "phone": "3900007887",
//     "fields": {
//         "class": "10th Grade",
//         "board": "CBSE",
//         "address": "123 Main Street",
//         "phoneNumber": "9876543210",
//         "email": "johndoe@example.com",
//         "fatherOccupation": "Engineer",
//         "motherOccupation": "Doctor",
//         "alternativeNumber": "7890123456",
//         "parentName": "Mr. and Mrs. Doe",
//         "schoolName": "ABC High School",
//         "city": "New York",
//         "state": "NY",
//         "percentage": "92%",
//         "interactWith": "Counselor"
//     },
//     "assignedAdmin": null,
//     "region": null,
//     "createdAt": "2025-03-05T12:33:09.751Z",
//     "updatedAt": "2025-03-07T16:08:20.109Z",
//     "__v": 0,
//     "assignedOwner": {
//         "_id": "67cb19dd97eb04cf8489c931",
//         "name": "caller@gmail.com",
//         "email": "caller@gmail.com",
//         "phone": "9876543210"
//     },
//     "favorite": true
// }

// const responseObject = {
//     "total": 19,
//     "leads": [
//         {
//             "_id": "67ce6b3f4353d8124a10bef1",
//             "name": {
//                 "name": "reetesh Singh leadC",
//                 "favorite": false
//             },
//             "phone": "9700001868",
//             "assignedAdmin": null,
//             "region": "67cb186197eb04cf8489c916",
//             "status": 1,
//             "leadscore": 0,
//             "createdBy": "67cb19dd97eb04cf8489c931",
//             "createdAt": "2025-03-10T04:31:59.037Z",
//             "updatedAt": "2025-03-10T07:29:26.127Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "9th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67ce69fd7f30e90eb3c6bcb2",
//             "name": {
//                 "name": "reetesh leadB",
//                 "favorite": true
//             },
//             "phone": "9700001867",
//             "assignedAdmin": "67cb17f097eb04cf8489c914",
//             "region": "67cb186197eb04cf8489c916",
//             "status": 1,
//             "createdBy": "67cb19dd97eb04cf8489c931",
//             "createdAt": "2025-03-10T04:26:37.287Z",
//             "updatedAt": "2025-03-10T04:26:37.287Z",
//             "__v": 0,
//             "assignedOwner": null,
//             "class": "9th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67ce69567a67c6e824266109",
//             "name": {
//                 "name": "reetesh lead",
//                 "favorite": true
//             },
//             "phone": "9500001867",
//             "assignedAdmin": "67cb17f097eb04cf8489c914",
//             "region": "67cb186197eb04cf8489c916",
//             "status": 1,
//             "createdBy": "67cb19dd97eb04cf8489c931",
//             "createdAt": "2025-03-10T04:23:50.190Z",
//             "updatedAt": "2025-03-10T04:23:50.190Z",
//             "__v": 0,
//             "assignedOwner": null,
//             "class": "9th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67cc01a3ec834502a69566f1",
//             "name": {
//                 "name": "reeteshB",
//                 "favorite": true
//             },
//             "phone": "5500001867",
//             "region": "67c7df011e3e66164e985253",
//             "status": 1,
//             "createdAt": "2025-03-08T08:36:51.962Z",
//             "updatedAt": "2025-03-08T08:38:23.389Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67cc0193ec834502a69566e8",
//             "name": {
//                 "name": "reetesh",
//                 "favorite": true
//             },
//             "phone": "5300001867",
//             "region": "67c7df011e3e66164e985253",
//             "status": 1,
//             "createdAt": "2025-03-08T08:36:35.047Z",
//             "updatedAt": "2025-03-08T08:38:23.389Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67c844c9ce78280e8565ea6b",
//             "name": {
//                 "name": "John M",
//                 "favorite": true
//             },
//             "phone": "3300001867",
//             "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
//             "region": "67c7df011e3e66164e985253",
//             "createdAt": "2025-03-05T12:34:17.889Z",
//             "updatedAt": "2025-03-07T16:08:20.109Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67c844bace78280e8565ea62",
//             "name": {
//                 "name": "John l",
//                 "favorite": true
//             },
//             "phone": "9900001867",
//             "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
//             "region": "67c7df011e3e66164e985253",
//             "createdAt": "2025-03-05T12:34:02.417Z",
//             "updatedAt": "2025-03-07T16:08:20.109Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67c844b0ce78280e8565ea59",
//             "name": {
//                 "name": "John K",
//                 "favorite": true
//             },
//             "phone": "8900001867",
//             "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
//             "region": "67c7df011e3e66164e985253",
//             "createdAt": "2025-03-05T12:33:52.549Z",
//             "updatedAt": "2025-03-07T16:08:20.109Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67c844a1ce78280e8565ea50",
//             "name": {
//                 "name": "John j",
//                 "favorite": true
//             },
//             "phone": "8900007867",
//             "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
//             "region": "67c7df011e3e66164e985253",
//             "createdAt": "2025-03-05T12:33:37.798Z",
//             "updatedAt": "2025-03-07T16:08:20.109Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67c84493ce78280e8565ea47",
//             "name": {
//                 "name": "John i",
//                 "favorite": true
//             },
//             "phone": "8900007887",
//             "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
//             "region": "67c7df011e3e66164e985253",
//             "createdAt": "2025-03-05T12:33:23.334Z",
//             "updatedAt": "2025-03-07T16:08:20.109Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "caller@gmail.com",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "leadScore": 85,
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         }
//     ]
// }

// const rowDetail = {
//     "_id": "67c84485ce78280e8565ea3e",
//     "name": "John H",
//     "phone": "3900007887",
//     "fields": {
//         "class": "10th Grade",
//         "board": "CBSE",
//         "address": "123 Main Street",
//         "phoneNumber": "9876543210",
//         "email": "johndoe@example.com",
//         "fatherOccupation": "Engineer",
//         "motherOccupation": "Doctor",
//         "alternativeNumber": "7890123456",
//         "parentName": "Mr. and Mrs. Doe",
//         "schoolName": "ABC High School",
//         "city": "New York",
//         "state": "NY",
//         "percentage": "92%",
//         "interactWith": "Counselor"
//     },
//     "assignedAdmin": null,
//     "region": null,
//     "createdAt": "2025-03-05T12:33:09.751Z",
//     "updatedAt": "2025-03-07T16:08:20.109Z",
//     "__v": 0,
//     "assignedOwner": {
//         "_id": "67cb19dd97eb04cf8489c931",
//         "name": "caller@gmail.com",
//         "email": "caller@gmail.com",
//         "phone": "9876543210"
//     },
//     "favorite": true
// };

// const fields = [
//     {
//         "_id": "67c056d750770385063ce1dd",
//         "name": "class",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-02-27T12:13:11.865Z",
//         "updatedAt": "2025-02-27T12:13:11.865Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c8316e805b8529252cdcc6",
//         "name": "name",
//         "type": "TEXT",
//         "options": [
//             "academic",
//             "upsc"
//         ],
//         "createdAt": "2025-03-05T11:11:42.096Z",
//         "updatedAt": "2025-03-05T11:11:42.096Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c831a4805b8529252cdcc9",
//         "name": "board",
//         "type": "DROPDOWN",
//         "options": [
//             "academic",
//             "upsc"
//         ],
//         "createdAt": "2025-03-05T11:12:36.537Z",
//         "updatedAt": "2025-03-05T11:12:36.537Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c831be805b8529252cdccc",
//         "name": "status",
//         "type": "TEXT",
//         "options": [
//             "academic",
//             "upsc"
//         ],
//         "createdAt": "2025-03-05T11:13:02.827Z",
//         "updatedAt": "2025-03-05T11:13:02.827Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c831e4805b8529252cdccf",
//         "name": "assigned",
//         "type": "TEXT",
//         "options": [
//             "academic",
//             "upsc"
//         ],
//         "createdAt": "2025-03-05T11:13:40.975Z",
//         "updatedAt": "2025-03-05T11:13:40.975Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c831fd805b8529252cdcd2",
//         "name": "leadScore",
//         "type": "TEXT",
//         "options": [
//             "academic",
//             "upsc"
//         ],
//         "createdAt": "2025-03-05T11:14:05.826Z",
//         "updatedAt": "2025-03-05T11:14:05.826Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c8320f805b8529252cdcd5",
//         "name": "address",
//         "type": "TEXT",
//         "options": [
//             "academic",
//             "upsc"
//         ],
//         "createdAt": "2025-03-05T11:14:23.626Z",
//         "updatedAt": "2025-03-05T11:14:23.626Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c832663d7b24448b97a961",
//         "name": "phoneNumber",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:15:50.090Z",
//         "updatedAt": "2025-03-05T11:15:50.090Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c832cd3d7b24448b97a974",
//         "name": "email",
//         "type": "EMAIL",
//         "options": [],
//         "createdAt": "2025-03-05T11:17:33.232Z",
//         "updatedAt": "2025-03-05T11:17:33.232Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c837d03d7b24448b97a977",
//         "name": "fatherOccupation",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:38:56.584Z",
//         "updatedAt": "2025-03-05T11:38:56.584Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c837d83d7b24448b97a97a",
//         "name": "motherOccupation",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:39:04.596Z",
//         "updatedAt": "2025-03-05T11:39:04.596Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838033d7b24448b97a97d",
//         "name": "alternativeNumber",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:39:47.959Z",
//         "updatedAt": "2025-03-05T11:39:47.959Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838133d7b24448b97a980",
//         "name": "parentName",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:40:03.607Z",
//         "updatedAt": "2025-03-05T11:40:03.607Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838273d7b24448b97a983",
//         "name": "schoolName",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:40:23.043Z",
//         "updatedAt": "2025-03-05T11:40:23.043Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838373d7b24448b97a986",
//         "name": "leadScore",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:40:39.735Z",
//         "updatedAt": "2025-03-05T11:40:39.735Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838423d7b24448b97a989",
//         "name": "city",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:40:50.716Z",
//         "updatedAt": "2025-03-05T11:40:50.716Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c8384f3d7b24448b97a98c",
//         "name": "state",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:41:03.387Z",
//         "updatedAt": "2025-03-05T11:41:03.387Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838583d7b24448b97a98f",
//         "name": "percentage",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:41:12.954Z",
//         "updatedAt": "2025-03-05T11:41:12.954Z",
//         "__v": 0
//     },
//     {
//         "_id": "67c838673d7b24448b97a992",
//         "name": "interactWith",
//         "type": "TEXT",
//         "options": [],
//         "createdAt": "2025-03-05T11:41:27.449Z",
//         "updatedAt": "2025-03-05T11:41:27.449Z",
//         "__v": 0
//     }
// ]


class TableService{
 
    getTableData = async () => {
      const url = '/api/lead/read/leads-without-actions';
    //   return responseObject;
      return await callApi(url,API.POST);
    }

    toggleFavorite = async (leadId:string,currentState:boolean) => {
      const url = `/api/lead/write/favorite/${leadId}`;
      return await callApi(url,API.PATCH,{"favorite":currentState},true);
    }

    getFullDetails = async (userId:string) => {
      const url = `/api/lead/read/get-lead-by?Id=${userId}`;
    //   return rowDetail;
      return await callApi(url,API.GET);
    } 

    createTask = async (taskDetails:IAddTask) => {
      const url = '/api/task/create';
      return await callApi(url,API.POST,taskDetails,true);
    }

    getFormFields = async ():Promise<FormField[]> => {
      const url = '/api/lead_field/read/get-all-fields';
      return await callApi(url,API.GET);
    //   return fields;
    }
}

export const TableInstance = new TableService();